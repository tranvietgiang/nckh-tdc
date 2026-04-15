export default function backToPage(navigate) {
  const goBack = () => {
    navigate(-1);
  };

  return goBack;
}
