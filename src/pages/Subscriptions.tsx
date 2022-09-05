import { useState, useEffect } from "react";
import { Box, CardMedia, Container, Skeleton, Typography } from "@mui/material";
import useCRMContent from "../fetchDataHooks/useCRMContent";
import { Button, Heading, Loader } from "@aws-amplify/ui-react";
import useSubscriptionPlans from "../fetchDataHooks/useSubscriptionPlans";
import { convertRetailPriceCentsToRetailPrice, capitalize } from "utils/strings";
import { BackButton } from "../components";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import api from '../capableApi'
import { useCurrentPatient } from "../fetchDataHooks";
import { SubscriptionScheduleDetail, SubscriptionOption } from "models/subscriptions/Subscription.types";
import { useNavigate } from "react-router-dom";
import useActiveSubscription from "fetchDataHooks/useActiveSubscription";

const SubscriptionHeader = ({title, content}: {title: string, content: string}) => (
  <Box sx={{ backgroundColor: "background.paper" }}>
    <CardMedia
      component="img"
      width="375"
      image={process.env.REACT_APP_LOGO}
      alt="Logo image"
    />
    <Container sx={{ padding: "2rem 1rem 1rem 1rem", boxShadow: ["rgb(2 2 40 / 8%) 0px 4px 6px"], }}>
      <Box sx={{
        textAlign: "center",
      }}>
        <Heading level={5}>{title}</Heading>
        <Typography variant="h6" sx={{ paddingTop: "1rem" }}>
          {content}
        </Typography>
      </Box>
    </Container>
  </Box>
);

const intervalToPeriodicMap = {
  "day": "Daily",
  "week": "Weekly",
  "month": "Monthly",
  "year": "Yearly"
}

const formatPayScheduleDetail = (subscriptionDetail: SubscriptionScheduleDetail) => {
  const { interval, interval_count: count } = subscriptionDetail;
  if (!subscriptionDetail) return '';
  if (count === 1) return intervalToPeriodicMap[interval]
  return `Every ${count} ${capitalize(interval)}s`
}

const SubscriptionOptionCard = (
  { subscription,
    onClick,
    selected
  } : {
    subscription: SubscriptionOption,
    onClick?: () => void,
    selected?: boolean
  }) => {
  return (
    <Box onClick={() => onClick ? onClick() : null} sx={{
      padding: "1rem",
      marginBottom: "1rem",
      borderRadius: "0.7rem",
      backgroundColor: "common.white",
      cursor: "pointer",
      outline: selected ? `${process.env.REACT_APP_COLOR} 1px solid` : "none",
      boxShadow: ["rgb(2 2 40 / 8%) 0px 4px 6px"],
    }}>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "500",
      }}>
        {/* TODO: need backend provide plan product details for name */}
        <Box>{subscription.nickname || subscription.temp_name}</Box>
        <Box>${convertRetailPriceCentsToRetailPrice(subscription.unit_amount)}</Box>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        {/*@ts-ignore*/}
        <Typography variant="eyebrow">
          {subscription.metadata?.trial_period_in_days ?
            `${subscription.metadata?.trial_period_in_days} Day${subscription.metadata?.trial_period_in_days > 1 ?
              's' : ''} Free Trial` : null}
        </Typography>
        {/*@ts-ignore*/}
        <Typography variant="eyebrow">{formatPayScheduleDetail(subscription.recurring)}</Typography>
      </Box>
    </Box>
  )
}

const SubscriptionSelection = (
  {
    selectedSubscription,
    setSelectedSubscription,
    plans,
    setPageView
  }: {
    selectedSubscription: SubscriptionOption,
    setSelectedSubscription: (plan: SubscriptionOption) => void,
    plans: SubscriptionOption[],
    setPageView: (view: string) => void
  }) => {
  let counter = 0;
  return (
    <Box sx={{padding: "1rem", background: '#FAFAFA', height: "100%"}}>
      <Box sx={{paddingBottom: "1rem", fontWeight: "500"}}>
        Choose your plan
      </Box>
      {plans.map((planOption, index) => {
        if (!planOption.nickname) {
          counter += 1;
          planOption.temp_name = `Subscription Plan ${counter}`
        }
        return (
          <SubscriptionOptionCard
            key={index}
            subscription={planOption}
            onClick={() => setSelectedSubscription(planOption)}
            selected={selectedSubscription?.id === planOption.id}
          />
        )
      })}
      <Box sx={{textAlign: "center"}}>
        <Button width="100%" type="submit" variation="primary" onClick={() => setPageView('Payment')}>
          Continue to payment
        </Button>
      </Box>
    </Box>
  )
}

const StripeErrorMessage = ({ message } : { message: string }) => (
  <Box sx={{ textAlign: "center", color: "#eb1c26", fontWeight: 500, padding: "1rem 0.5rem" }}>
    {message}
  </Box>
)

const SubscriptionPayment = (
  {
    selectedSubscription,
    setPageView
  } : {
    selectedSubscription: SubscriptionOption,
    setPageView: (view: string) => void
  }) => {
  const stripe = useStripe();
  const elements= useElements();
  const { currentPatient } = useCurrentPatient();
  const [clientSecret, setClientSecret] = useState<string>();
  const [zipCode, setZipcode] = useState<string>();
  const [stripeError, setStripeError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateTrialSubscription = async () => {
    let secret = clientSecret;
    if (!secret) {
      const intent = await api.client.SetupIntent.create({ body: {
          setup_intent: {
            patient_id: currentPatient.id
          }
        }})

      if (intent.error) {
        throw new Error('Woops something went wrong');
      }
      secret = intent.body.client_secret;
      setClientSecret(secret);
    }

    const { error, setupIntent } = await stripe.confirmCardSetup(
      secret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            email: `${currentPatient.email}`,
            phone: `${currentPatient.phone_number}`,
            address: {
              postal_code: zipCode
            }
          }
        }
      }
    )

    if (error) {
      setStripeError(error.message)
      setLoading(false);
    } else if (setupIntent.status === 'succeeded') {
      const subscriptionResponse = await api.client.Subscription.create({ body: {
          subscription: {
            patient_id: currentPatient.id,
            price_ids: [selectedSubscription.id]
          }
        }})

      if (subscriptionResponse.error) {
        throw new Error('Woops something went wrong');
      }

      setLoading(false);
      setPageView('PaymentSuccess')
    }
  }

  const handleCreatePaidSubscription = async () => {
    let secret = clientSecret;
    if (!secret) {
      const paymentIntent = await api.client.Subscription.create({ body: {
        subscription: {
          patient_id: currentPatient.id,
          price_ids: [selectedSubscription.id]
        }
      }})

      if (paymentIntent.error) {
        throw new Error('Woops something went wrong');
      }

      secret = paymentIntent.body.latest_invoice.payment_intent.client_secret;
      setClientSecret(secret);
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      secret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            email: `${currentPatient.email}`,
            phone: `${currentPatient.phone_number}`,
            address: {
              postal_code: zipCode
            }
          }
        }
      }
    )

    setLoading(false);
    if (error) {
      setStripeError(error.message)
    } else if (paymentIntent.status === 'succeeded') {
      setPageView('PaymentSuccess')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    setStripeError(null);

    const hasTrial = !!selectedSubscription.metadata?.trial_period_in_days

    if (hasTrial) {
      await handleCreateTrialSubscription();
    } else {
      await handleCreatePaidSubscription();
    }
  }

  return (
    <Box sx={{ background: "#FAFAFA", height: "100%", overflow: "scroll" }}>
      <BackButton onClick={() => setPageView("SubscriptionOptions")} />
      <Box sx={{ padding: "1rem" }}>
        <Box sx={{ paddingBottom: "1rem", fontWeight: "500" }}>
          Your plan
        </Box>
        <SubscriptionOptionCard
          selected
          subscription={selectedSubscription}
        />
        <StripeErrorMessage message={stripeError}/>
        <form onSubmit={handleSubmit}>
          <Box>
            <Typography variant="h6">Card Number</Typography>
            <CardNumberElement />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between"
            }}
          >
            <Box sx={{ width: "45%"}}>
              <Typography variant="h6">Expiration</Typography>
              <CardExpiryElement />
            </Box>
            <Box sx={{ width: "45%"}}>
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
              value={zipCode ?? ""}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </Box>
          <Button
            width="100%"
            type="submit"
            variation="primary"
            disabled={!stripe || !elements || !currentPatient || !zipCode || loading
          }>
            { loading ? <Loader /> : "Pay" }
          </Button>
        </form>
      </Box>
    </Box>
  )
}

const color = '#0100c8'

const PaymentSuccess = ({selectedSubscription} : {selectedSubscription: SubscriptionOption}) => {
  const navigate = useNavigate();
  const { currentPatient } = useCurrentPatient();
  const { isLoading } = useActiveSubscription(currentPatient?.id);

  if (isLoading) { return <Skeleton variant="rectangular" animation="wave" height={280} /> }

  return (
    <Box sx={{ textAlign: "center", padding: "5rem 1rem" }}>
      {
        selectedSubscription?.metadata?.trial_period_in_days ? (
          <>
            <Heading level={5}>Trial Started</Heading>
            <Typography variant="h6" sx={{ padding: "1rem 0 2rem" }}>
              Your free { selectedSubscription?.metadata?.trial_period_in_days }-day
              trial has begun. You may now continue to your account!
            </Typography>
          </>
        ) : (
          <>
            <Heading level={5}>Payment Successful</Heading>
            <Typography variant="h6" sx={{ padding: "1rem 0 2rem" }}>
              Your payment has been processed. You may now continue to your account!
            </Typography>
          </>
        )
      }
      <Button width="100%" variation="primary" onClick={() => navigate('/home')}>
        Continue
      </Button>
    </Box>
  )
}

export const Subscriptions = () => {
  const { isLoading, data } = useCRMContent({ cms_entry_id: process.env.REACT_APP_CONTENTFUL_COMPANY_DESCRIPTION_ID })
  const { subscriptionPlans, isLoading: plansLoading, isError } = useSubscriptionPlans()
  const [pageView, setPageView] = useState('SubscriptionOptions')
  const [selectedSubscription, setSelectedSubscription] = useState();
  const [activeSubscriptionOptions, setActiveSubscriptionOptions] = useState([])

  useEffect(() => {
    if (!isLoading && !plansLoading && subscriptionPlans && subscriptionPlans.length > 0) {
      const options = subscriptionPlans.filter((plan) => (
        plan.active && plan.type === "recurring"
      ))
      setActiveSubscriptionOptions(options)
      setSelectedSubscription(options[0])
    }
  }, [isLoading, plansLoading, subscriptionPlans])

  if (isLoading || plansLoading) { return <Skeleton variant="rectangular" animation="wave" height={280} /> }

  if (isError) {
    console.log("Failed to fetch tenant subscription plans:", isError)
    return <div>Woops something went wrong...</div>;
  }

  const subscriptionContent = data.description.content.map((contentNode) => (
    contentNode.content.map((subContentNode) => subContentNode.value).join('')
  )).join('\n')

  const renderSubscriptionPage = () => {
    switch(pageView) {
      case 'SubscriptionOptions':
        return (
          <>
            <SubscriptionHeader title={data.name} content={subscriptionContent}/>
            <SubscriptionSelection
              plans={activeSubscriptionOptions}
              setPageView={setPageView}
              selectedSubscription={selectedSubscription}
              // @ts-ignore
              setSelectedSubscription={setSelectedSubscription}
            />
          </>
        )
      case 'Payment':
        return (
          <SubscriptionPayment
            selectedSubscription={selectedSubscription}
            setPageView={setPageView}
          />
        )
      case 'PaymentSuccess':
        return (
          <PaymentSuccess selectedSubscription={selectedSubscription} />
        )
    }
  }

  return (
    <Box sx={{overflow: "scroll", height: "100%"}}>
      {renderSubscriptionPage()}
    </Box>
  )
}

export default Subscriptions;
