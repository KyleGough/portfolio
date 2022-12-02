export const validateEmail = (email: string) => {
  const emailRegex =
    /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;
  return !email || emailRegex.test(String(email).toLowerCase());
};

export const getFieldBorderStyle = (valid: boolean, sent: boolean) => {
  if (sent) {
    return 'border-link-hover';
  } else {
    return valid ? 'border-link focus:border-link-hover' : 'border-error';
  }
};
