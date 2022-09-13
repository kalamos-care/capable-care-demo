import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Box, CardMedia, Container, Skeleton, Typography, Divider } from "@mui/material";
import useCRMContent from "../fetchDataHooks/useCRMContent";
import { Button, Heading, Loader } from "@aws-amplify/ui-react";
import useSubscriptionPlans from "../fetchDataHooks/useSubscriptionPlans";
import {
  convertRetailPriceCentsToRetailPrice,
  capitalize,
} from "utils/strings";
import { ActionButton } from "../components";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import api from "../capableApi";
import { useCurrentPatient, useExistingPaymentMethod } from "../fetchDataHooks";
import {
  Subscription,
  SubscriptionOption,
} from "models/subscriptions/Subscription.types";
import { useNavigate } from "react-router-dom";
import useActiveSubscription from "fetchDataHooks/useActiveSubscription";
import * as Sentry from "@sentry/react";
import { formatDateString } from "utils/dates";

const SubscriptionHeader = ({ title, content }: { title: string; content: string }) => (
  <Box sx={{ backgroundColor: "background.paper" }}>
    <CardMedia component="img" width="375" image={process.env.REACT_APP_LOGO} alt="Logo image" />
    <Container
      sx={{
        padding: "2rem 1rem 1rem 1rem",
        boxShadow: ["rgb(2 2 40 / 8%) 0px 4px 6px"],
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Heading level={5}>{title}</Heading>
        <Typography variant="h6" sx={{ paddingTop: "1rem" }}>
          {content}
        </Typography>
      </Box>
    </Container>
  </Box>
);

const intervalToPeriodicMap = {
  day: "Daily",
  week: "Weekly",
  month: "Monthly",
  year: "Yearly",
};

const formatPayScheduleDetail = (
  interval: string,
  count: number
) => {
  if (!interval || !count) return "";
  if (count === 1) return intervalToPeriodicMap[interval];
  return `Every ${count} ${capitalize(interval)}s`;
};

const SubscriptionOptionCard = ({
  subscription,
  onClick,
  selected,
}: {
  subscription: SubscriptionOption;
  onClick?: () => void;
  selected?: boolean;
}) => {
  return (
    <Box
      onClick={() => (onClick ? onClick() : null)}
      sx={{
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "4px",
        backgroundColor: "common.white",
        cursor: onClick ? "pointer" : null,
        outline: selected ? `${process.env.REACT_APP_COLOR} 1px solid` : "none",
        boxShadow: ["rgb(2 2 40 / 8%) 0px 4px 6px"],
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "500",
        }}
      >
        <Box>
          {subscription.capable_health_metadata.name || subscription.temp_name}
        </Box>
        <Box>
          ${convertRetailPriceCentsToRetailPrice(subscription.unit_amount)}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/*@ts-ignore*/}
        <Typography variant="eyebrow">
          {subscription.metadata?.trial_period_in_days
            ? `${subscription.metadata?.trial_period_in_days} Day${
                subscription.metadata?.trial_period_in_days > 1 ? "s" : ""
              } Free Trial`
            : null}
        </Typography>
        <Typography variant="eyebrow">
          {formatPayScheduleDetail(subscription.recurring?.interval, subscription.recurring?.interval_count)}
        </Typography>
      </Box>
      {subscription.capable_health_metadata?.description && (
        <Box sx={{ fontSize: "0.9rem", paddingTop: "1rem" }}>
          {subscription.capable_health_metadata.description}
        </Box>
      )}
    </Box>
  );
};

const SubscriptionSelection = ({
  selectedSubscription,
  setSelectedSubscription,
  plans,
  setPageView,
  signOut,
}: {
  selectedSubscription: SubscriptionOption;
  setSelectedSubscription: (plan: SubscriptionOption) => void;
  plans: SubscriptionOption[];
  setPageView: (view: string) => void;
  signOut: () => void;
}) => {
  let counter = 0;
  return (
    <Box sx={{ padding: "1rem", background: "#FAFAFA", height: "100%" }}>
      <Box sx={{ paddingBottom: "1rem", fontWeight: "500" }}>Choose your plan</Box>
      {plans.map((planOption, index) => {
        if (!planOption.capable_health_metadata.name) {
          counter += 1;
          planOption.temp_name = `Subscription Plan ${counter}`;
        }
        return (
          <SubscriptionOptionCard
            key={index}
            subscription={planOption}
            onClick={() => setSelectedSubscription(planOption)}
            selected={selectedSubscription?.id === planOption.id}
          />
        );
      })}
      <Box sx={{ textAlign: "center" }}>
        <Button
          width="100%"
          type="submit"
          variation="primary"
          onClick={() => setPageView("Payment")}
        >
          Continue to payment
        </Button>
        <Button
          variation="link"
          size="small"
          onClick={signOut}
          type="button"
          color={process.env.REACT_APP_COLOR}
        >
          Log out
        </Button>
      </Box>
    </Box>
  );
};

const StripeErrorMessage = ({ message }: { message: string }) => (
  <Box
    sx={{
      textAlign: "center",
      color: "#eb1c26",
      fontWeight: 500,
      padding: "1rem 0.5rem",
    }}
  >
    {message}
  </Box>
);

const calculateDiscount = (total: number, coupon: { amount_off: number; percent_off: number }) => {
  const { amount_off, percent_off } = coupon;
  if (amount_off) {
    return amount_off;
  } else if (percent_off) {
    // Round down to nearest cent for percentage discounts
    return Math.round((total * percent_off) / 100);
  }
  return 0;
};

const PromoCode = ({
  selectedSubscription,
  setPromoCode,
  promoCode,
  setPromoDiscount,
}: {
  selectedSubscription: SubscriptionOption;
  setPromoCode: Dispatch<SetStateAction<string>>;
  setPromoDiscount: Dispatch<SetStateAction<number>>;
  promoCode: string;
}) => {
  const timeout = useRef<number>();
  const handleOnChange = (event) => {
    const promoCode = event.target.value;
    setPromoCode(promoCode);
    if (promoCode.length > 2) {
      handleDebouncedCheckPromo(promoCode);
    }
  };
  const [promoCodeError, setPromoCodeError] = useState<string>(null);
  const [promoCodeMessage, setPromoCodeMessage] = useState<string>(null);

  const fetchPromoCode = async (codex: string) => {
    setPromoDiscount(null);
    setPromoCodeError(null);
    setPromoCodeMessage(null);
    try {
      const codeResponse = await api.client.PromotionCode.promotionCodesCodeGet(codex);
      const code = codeResponse.body;

      if (!code.active) {
        setPromoCodeError("Promo code has expired");
      } else if (code.expires_at && Date.now() <= Date.parse(code.expires_at)) {
        setPromoCodeError("Promo code has expired");
      } else if (code.has_remaining_redemptions === false) {
        setPromoCodeError("Promo code has expired");
      } else if (
        code.minimum_amount_required &&
        code.minimum_amount_required > selectedSubscription.unit_amount
      ) {
        setPromoCodeError("Promo code cannot be applied to this subscription");
      } else if (
        code.coupon?.applies_to?.products &&
        !code.coupon.applies_to.products.includes(selectedSubscription.product)
      ) {
        setPromoCodeError("Promo code cannot be applied to this subscription");
      } else {
        setPromoDiscount(calculateDiscount(selectedSubscription.unit_amount, code.coupon));
        setPromoCodeMessage("Promo code code successfully applied!");
      }
    } catch (e) {
      setPromoCodeError("Promo code is invalid");
    }
  };

  const handleDebouncedCheckPromo = async (inputValue: string) => {
    return await new Promise<void>((resolve) => {
      clearTimeout(timeout.current);
      timeout.current = window.setTimeout(
        () => resolve(fetchPromoCode(inputValue)),
        600
      );
    });
  };

  return (
    <Box>
      <Box>
        <Typography variant="h6">Promo Code</Typography>
      </Box>
      <input
        className="StripeElement"
        name="promoCode"
        placeholder="Promo Code"
        value={promoCode}
        onChange={handleOnChange}
      />
      <Box sx={{ position: "relative", top: "-1rem" }}>
        {promoCodeError && (
          // @ts-ignore
          <Typography variant="eyebrow" sx={{ color: "red" }}>
            {promoCodeError}
          </Typography>
        )}
        {promoCodeMessage && (
          // @ts-ignore
          <Typography variant="eyebrow" sx={{ color: "green" }}>
            {promoCodeMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const PaymentTotal = ({
  selectedSubscription,
  promoDiscount,
}: {
  selectedSubscription: SubscriptionOption;
  promoDiscount: number;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      fontWeight: 500,
      padding: "1rem",
      marginBottom: "1rem",
      backgroundColor: "common.white",
      borderRadius: "4px",
      boxShadow: ["rgb(2 2 40 / 8%) 0px 4px 6px"],
    }}
  >
    <Box>Total</Box>
    <Box style={promoDiscount ? { color: "green" } : {}}>
      $
      {convertRetailPriceCentsToRetailPrice(
        selectedSubscription.unit_amount - (promoDiscount ?? 0)
      )}
    </Box>
  </Box>
);

const SubscriptionPayment = ({
  selectedSubscription,
  setPageView,
  currentPatient,
  existingPaymentMethod,
  setShowConfirmPage,
}: {
  selectedSubscription: SubscriptionOption;
  setPageView: (view: string) => void;
  currentPatient: any;
  existingPaymentMethod: string;
  setShowConfirmPage: (show: boolean) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [promoCode, setPromoCode] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>();
  const [zipCode, setZipcode] = useState<string>();
  const [stripeError, setStripeError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [useNewCard, setUseNewCard] = useState<boolean>(false);
  const [promoDiscount, setPromoDiscount] = useState<number>(null);
  const createSubscription = async () => {
    const subscriptionResponse = await api.client.Subscription.create({
      body:
        promoCode === ""
          ? {
              subscription: {
                patient_id: currentPatient.id,
                price_ids: [selectedSubscription.id],
              },
            }
          : {
              subscription: {
                patient_id: currentPatient.id,
                price_ids: [selectedSubscription.id],
                promotion_code: promoCode !== "" ? promoCode : null,
              },
            },
    });

    if (subscriptionResponse.error) {
      throw new Error(`Failed to create capable subscription: ${subscriptionResponse.error}`);
    }
    return subscriptionResponse;
  };

  const handleCreateTrialSubscription = async () => {
    try {
      if (!existingPaymentMethod || useNewCard) {
        let secret = clientSecret;
        if (!secret) {
          const intent = await api.client.SetupIntent.create({
            body: {
              setup_intent: {
                patient_id: currentPatient.id,
              },
            },
          });

          if (intent.error) {
            throw new Error(`Failed to create capable setup intent: ${intent.error}`);
          }
          secret = intent.body.client_secret;
          setClientSecret(secret);
        }

        const { error, setupIntent } = await stripe.confirmCardSetup(secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              email: currentPatient.email,
              phone: currentPatient.phone_number?.number,
              address: {
                postal_code: zipCode,
              },
            },
          },
        });

        if (error) {
          setStripeError(error.message);
          setLoading(false);
        } else if (setupIntent.status === "succeeded") {
          await createSubscription();
          setLoading(false);
          setShowConfirmPage(true);
          setPageView("PaymentSuccess");
        }
      } else {
        await createSubscription();
        setLoading(false);
        setShowConfirmPage(true);
        setPageView("PaymentSuccess");
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error("Subscription trial failed", error);
      setLoading(false);
    }
  };

  const handleCreatePaidSubscription = async () => {
    try {
      let secret = clientSecret;
      if (!secret) {
        const paymentIntent = await createSubscription();
        secret = paymentIntent.body.latest_invoice.payment_intent.client_secret;
        setClientSecret(secret);
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(secret, {
        payment_method:
          existingPaymentMethod && !useNewCard
            ? existingPaymentMethod
            : {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  email: currentPatient.email,
                  phone: currentPatient.phone_number?.number,
                  address: {
                    postal_code: zipCode,
                  },
                },
              },
      });

      setLoading(false);
      if (error) {
        setStripeError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setShowConfirmPage(true);
        setPageView("PaymentSuccess");
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error("Subscription payment failed", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStripeError(null);

    const hasTrial = !!selectedSubscription.metadata?.trial_period_in_days;

    if (hasTrial) {
      await handleCreateTrialSubscription();
    } else {
      await handleCreatePaidSubscription();
    }
  };

  return (
    <Box sx={{ background: "#FAFAFA", height: "100%", overflow: "scroll" }}>
      <ActionButton
        type={"back"}
        onClick={() => setPageView("SubscriptionOptions")}
      />
      <Box sx={{ padding: "1rem" }}>
        <Box sx={{ paddingBottom: "1rem", fontWeight: "500" }}>Your plan</Box>
        <SubscriptionOptionCard selected subscription={selectedSubscription} />
        <StripeErrorMessage message={stripeError} />
        {existingPaymentMethod && !useNewCard ? (
          <Box>
            <Box sx={{ padding: "1rem 0 3rem" }}>
              Looks like we already have a credit card on file for you. Click Pay to use this card
              for payment.
            </Box>
            <PromoCode
              setPromoDiscount={setPromoDiscount}
              selectedSubscription={selectedSubscription}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
            />
            <PaymentTotal
              selectedSubscription={selectedSubscription}
              promoDiscount={promoDiscount}
            />
            <Button
              width="100%"
              type="submit"
              variation="primary"
              disabled={!stripe || !elements || !currentPatient || loading}
              onClick={handleSubmit}
            >
              {loading ? <Loader /> : "Pay"}
            </Button>
            <Box sx={{ padding: "1rem", textAlign: "center" }}>
              <Typography
                //@ts-ignore
                variant="eyebrow"
                sx={{ cursor: "pointer" }}
                onClick={() => setUseNewCard(true)}
              >
                + Pay with another card
              </Typography>
            </Box>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box>
              <Typography variant="h6">Card Number</Typography>
              <CardNumberElement />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "45%" }}>
                <Typography variant="h6">Expiration</Typography>
                <CardExpiryElement />
              </Box>
              <Box sx={{ width: "45%" }}>
                <Typography variant="h6">CVC</Typography>
                <CardCvcElement />
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography variant="h6">Zip</Typography>
              </Box>
              <input
                className="StripeElement"
                name="zipCode"
                pattern="^\d{5}(-\d{4})?$"
                title="Five digit zip code"
                placeholder="Zip Code"
                value={zipCode ?? ""}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </Box>
            <PromoCode
              setPromoDiscount={setPromoDiscount}
              selectedSubscription={selectedSubscription}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
            />
            <PaymentTotal
              selectedSubscription={selectedSubscription}
              promoDiscount={promoDiscount}
            />
            <Button
              width="100%"
              type="submit"
              variation="primary"
              disabled={!stripe || !elements || !currentPatient || !zipCode || loading}
            >
              {loading ? <Loader /> : "Pay"}
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
};

const PaymentSuccess = ({ selectedSubscription }: { selectedSubscription: SubscriptionOption }) => {
  const navigate = useNavigate();
  const { currentPatient } = useCurrentPatient();
  const { isLoading } = useActiveSubscription(currentPatient?.id);

  if (isLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  return (
    <Box sx={{ textAlign: "center", padding: "5rem 1rem" }}>
      {selectedSubscription?.metadata?.trial_period_in_days ? (
        <>
          <Heading level={5}>Trial Started</Heading>
          <Typography variant="h6" sx={{ padding: "1rem 0 2rem" }}>
            Your free {selectedSubscription?.metadata?.trial_period_in_days}-day trial has begun.
            You may now continue to your account!
          </Typography>
        </>
      ) : (
        <>
          <Heading level={5}>Payment Successful</Heading>
          <Typography variant="h6" sx={{ padding: "1rem 0 2rem" }}>
            Your payment has been processed. You may now continue to your account!
          </Typography>
        </>
      )}
      <Button width="100%" variation="primary" onClick={() => navigate("/home")}>
        Continue
      </Button>
    </Box>
  );
};

const Dot = ({ color } : { color: string }) => (
  <span style={{
    width: "10px",
    height: "10px",
    marginRight: "0.5rem",
    display: "inline-block",
    borderRadius: "50%",
    background: color
  }}/>
)

const SubscriptionCard = ({ subscription } : { subscription: Subscription }) => {
  return (
    <Box>
      <Typography variant="eyebrow" sx={{ fontSize: "1rem" }}>
        PLAN
      </Typography>
      <Typography variant="body1" sx={{ padding: "0.5rem 0"}}>
        {subscription.name}
      </Typography>
      <Divider sx={{ margin: "0.5rem 0" }}/>
      <Typography variant="eyebrow" sx={{ fontSize: "1rem" }}>
        STATUS
      </Typography>
      <Typography variant="body1" sx={{ padding: "0.5rem 0"}}>
        {(subscription.status === "active" ? <Dot color="green" /> : <Dot color="lightgreen" />)}
        {capitalize(subscription.status)}
      </Typography>
      <Divider sx={{ margin: "0.5rem 0" }}/>
      <Typography variant="eyebrow" sx={{ fontSize: "1rem" }}>
        RECURS
      </Typography>
      <Typography variant="body1" sx={{ padding: "0.5rem 0"}}>
        {formatPayScheduleDetail(subscription.billing_period, subscription.billing_interval)}
      </Typography>
      <Divider sx={{ margin: "0.5rem 0" }}/>
      <Typography variant="eyebrow" sx={{ fontSize: "1rem" }}>
        AMOUNT
      </Typography>
      <Typography variant="body1" sx={{ padding: "0.5rem 0"}}>
        ${convertRetailPriceCentsToRetailPrice(subscription.plan_price)}
      </Typography>
      <Divider sx={{ margin: "0.5rem 0" }}/>
      <Typography variant="eyebrow" sx={{ fontSize: "1rem" }}>
        {subscription.status === "active" ? "START DATE" : "TRIAL START"}
      </Typography>
      <Typography variant="body1" sx={{ padding: "0.5rem 0"}}>
        {formatDateString(subscription.created_at)}
      </Typography>
      <Divider sx={{ margin: "0.5rem 0" }}/>
      {subscription.trial_end && (
        <Box>
          <Typography variant="eyebrow" sx={{ fontSize: "1rem" }}>
            TRIAL END
          </Typography>
          <Typography variant="body1" sx={{ padding: "0.5rem 0"}}>
            {formatDateString(subscription.trial_end)}
          </Typography>
          <Divider sx={{ margin: "0.5rem 0" }}/>
        </Box>
      )}
      <Typography variant="eyebrow" sx={{ fontSize: "1rem" }}>
        {subscription.cancel_at ? "END DATE" : "NEXT BILL"}
      </Typography>
      <Typography variant="body1" sx={{ padding: "0.5rem 0"}}>
        {formatDateString(subscription.cancel_at ? subscription.cancel_at : subscription.upcoming_invoice_date)}
      </Typography>
    </Box>
  )
}

export const Subscriptions = ({ signOut }: { signOut: () => void }) => {
  const { isLoading, data } = useCRMContent({
    cms_entry_id: process.env.REACT_APP_CONTENTFUL_COMPANY_DESCRIPTION_ID,
  });
  const { currentPatient } = useCurrentPatient();
  const {
    subscriptionPlans,
    isLoading: plansLoading,
    isError,
  } = useSubscriptionPlans();
  const {
    data: activeSubscriptions,
    isLoading: subscriptionsLoading,
    isError: subError,
  } = useActiveSubscription(currentPatient?.id);
  const [pageView, setPageView] = useState("SubscriptionOptions");
  const [selectedSubscription, setSelectedSubscription] = useState();
  const [activeSubscriptionOptions, setActiveSubscriptionOptions] = useState(
    []
  );
  const [showConfirmPage, setShowConfirmPage] = useState<boolean>(false);
  const { data: existingPaymentMethod, isLoading: paymentMethodLoading } =
    useExistingPaymentMethod(currentPatient?.id);

  useEffect(() => {
    if (
      !isLoading &&
      !subscriptionsLoading &&
      !plansLoading &&
      subscriptionPlans &&
      subscriptionPlans.length > 0
    ) {
      const options = subscriptionPlans.filter(
        (plan) => plan.active && plan.type === "recurring"
      );
      setActiveSubscriptionOptions(options);
      setSelectedSubscription(options[0]);
    }
  }, [isLoading, plansLoading, subscriptionPlans, subscriptionsLoading]);

  if (isLoading || plansLoading || paymentMethodLoading || subscriptionsLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  if (isError || subError) {
    console.log("Failed to fetch subscriptions:", isError ?? subError);
    return <div>Woops something went wrong...</div>;
  }

  const subscriptionContent = data.description.content
    .map((contentNode) =>
      contentNode.content.map((subContentNode) => subContentNode.value).join("")
    )
    .join("\n");

  const renderSubscriptionPage = () => {
    switch (pageView) {
      case "SubscriptionOptions":
        return (
          <>
            <SubscriptionHeader title={data.name} content={subscriptionContent} />
            <SubscriptionSelection
              existingPaymentMethod={existingPaymentMethod}
              plans={activeSubscriptionOptions}
              setPageView={setPageView}
              selectedSubscription={selectedSubscription}
              // @ts-ignore
              setSelectedSubscription={setSelectedSubscription}
              signOut={signOut}
            />
          </>
        );
      case "Payment":
        return (
          <SubscriptionPayment
            currentPatient={currentPatient}
            selectedSubscription={selectedSubscription}
            setPageView={setPageView}
            existingPaymentMethod={existingPaymentMethod}
            setShowConfirmPage={setShowConfirmPage}
          />
        );
      case "PaymentSuccess":
        return <PaymentSuccess selectedSubscription={selectedSubscription} />;
    }
  };

  return (
    <Box sx={{ overflow: "auto", height: "100%" }}>
      {activeSubscriptions?.length > 0 && !showConfirmPage ? (
        <Box>
          <ActionButton
            type="back"
            route="/profile"
          />
          <Box sx={{ padding: "1rem" }}>
            <Heading>Subscriptions</Heading>
            {activeSubscriptions.map((subscription, index) => (
              <Box key ={index} sx={{
                borderRadius: "4px",
                marginTop: "2rem",
                padding: "1rem",
                boxShadow: "rgb(2 2 40 / 8%) 0px 4px 6px",
              }}>
                <SubscriptionCard subscription={subscription}/>
              </Box>
            ))}
            <Typography variant="body2" sx={{ paddingTop: "1.5rem", textAlign: "center" }}>
              To manage your subscriptions, please reach out to us via chat.
            </Typography>
          </Box>
        </Box>
      ) : renderSubscriptionPage()}
    </Box>
  );
};

export default Subscriptions;
