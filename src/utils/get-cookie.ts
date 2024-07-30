export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    console.log(parts.pop()?.split(";").shift());

    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};
