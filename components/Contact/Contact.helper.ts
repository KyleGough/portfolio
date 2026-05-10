export const validateEmail = (email: string) => {
  /* eslint-disable sonarjs/regex-complexity -- permissive email pattern */
  const emailRegex =
    /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;
  /* eslint-enable sonarjs/regex-complexity */
  return !email || emailRegex.test(String(email).toLowerCase());
};

export const getFieldBorderStyle = (valid: boolean, sent: boolean) => {
  if (sent) {
    return 'border-link-hover';
  } else {
    return valid ? 'border-link focus:border-link-hover' : 'border-error';
  }
};
