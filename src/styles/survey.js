// Injecting some styles into the survey using JavaScript
// because we need to use the ENV variable for the color

const style = document.createElement("style");
document.head.appendChild(style);
style.sheet.insertRule(
  `.sv_main input[type="button"] {background: ${process.env.REACT_APP_COLOR}}`
);
style.sheet.insertRule(
  `.sv_main .sv_body .sv_progress_bar {background: ${process.env.REACT_APP_COLOR}}`
);
style.sheet.insertRule(
  `.sv_main .sv_select_wrapper:before {background-color: ${process.env.REACT_APP_COLOR}}`
);
style.sheet.insertRule(
  `.sv_main input[type="checkbox"]:focus {outline: 1px dotted ${process.env.REACT_APP_COLOR}}`
);
style.sheet.insertRule(
  `.sv_main input[type="checkbox"]:checked {background: ${process.env.REACT_APP_COLOR} url('../assets/icon-check.svg') no-repeat center center}`
);
