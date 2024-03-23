import { useEffect } from "react";
import { GOOGLE_TOKEN, FACEBOOK_TOKEN } from "../libs/contants"

const AuthCallBack = () => {
    const currentUrl = window.location.href;

    function extractCodeFromUrl(urlString) {
      let url = new URL(urlString);
      let service_type = url.searchParams.get("service_type");
      let token = url.searchParams.get("access_token");
  
      if (service_type === "google") {
        return { service_type, access_token: token };
      } else {
        return { service_type, access_token: token };
      }
    }
  
    useEffect(() => {
      const { access_token, service_type } = extractCodeFromUrl(currentUrl);
      if (service_type !== null && service_type == "google") {
        localStorage.setItem(GOOGLE_TOKEN, access_token);
        window.location.href = "/integrations";
      } else {
        if (service_type !== null) {
          localStorage.setItem(FACEBOOK_TOKEN, access_token);
          window.location.href = "/integrations";
        }
      }
    }, [currentUrl]);

    return <></>
}

export default AuthCallBack;