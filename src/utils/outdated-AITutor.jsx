import { useEffect } from "react";

export default function AITutor() {
  useEffect(() => {
    function initBotpress() {
      if (window.botpress) {
        // Remove any previous iframe injected by Botpress
        const oldIframe = document.querySelector("#webchat iframe");
        if (oldIframe) oldIframe.remove();

        window.botpress.init({
          botId: "55357c88-910a-49f9-884e-ade7fd0024ca",
          clientId: "93f9ef27-e1b8-48a5-997c-579bb8ebd3f5",
          selector: "#webchat",
          hideWidget: true,
        });
        window.botpress.open();
      }
    }

    if (window.botpress) {
      initBotpress();
    } else if (!document.getElementById("bp-webchat")) {
      const script = document.createElement("script");
      script.id = "bp-webchat";
      script.src = "https://cdn.botpress.cloud/webchat/v2.4/inject.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        setTimeout(initBotpress, 0);
      };
    } else {
      const interval = setInterval(() => {
        if (window.botpress) {
          clearInterval(interval);
          initBotpress();
        }
      }, 100);
      setTimeout(() => clearInterval(interval), 5000);
    }

    // Optional: Clean up on unmount
    return () => {
      // Remove the iframe
      const oldIframe = document.querySelector("#webchat iframe");
      if (oldIframe) oldIframe.remove();
      // Remove the Botpress script
      const oldScript = document.getElementById("bp-webchat");
      if (oldScript) oldScript.remove();
      // Remove Botpress from window (optional, for a true reset)
      if (window.botpress) delete window.botpress;
    };
  }, []);

  return (
    <div
      id="webchat"
      style={{
        width: "90vw",
        height: "70vh",
        margin: "0 auto",
      }}
    />
  );
}


/*
import { useEffect } from "react";

export default function AITutor() {
  useEffect(() => {
    function initBotpress() {
      if (window.botpress) {
        window.botpress.init({
          botId: "55357c88-910a-49f9-884e-ade7fd0024ca",
          clientId: "93f9ef27-e1b8-48a5-997c-579bb8ebd3f5",
          selector: "#webchat",
          hideWidget: true, 
        });
        window.botpress.open(); // Opens the chat immediately
      }
    }

    if (!document.getElementById("bp-webchat")) {
      const script = document.createElement("script");
      script.id = "bp-webchat";
      script.src = "https://cdn.botpress.cloud/webchat/v2.4/inject.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        setTimeout(initBotpress, 0);
      };
    } else {
      const interval = setInterval(() => {
        if (window.botpress) {
          clearInterval(interval);
          initBotpress();
        }
      }, 100);
      setTimeout(() => clearInterval(interval), 5000);
    }
  }, []);

  return (
    <div
      id="webchat"
      style={{
        margin: "0 auto",
      }}
    />
  );
}
*/
/*
import { useEffect } from "react";

export default function AITutor() {
  useEffect(() => {
    function initBotpress() {
      if (window.botpress) {
        window.botpress.on("webchat:ready", () => {
         window.botpress.open();
    });
        window.botpress.init({
          botId: "55357c88-910a-49f9-884e-ade7fd0024ca",
          clientId: "93f9ef27-e1b8-48a5-997c-579bb8ebd3f5",
          selector: "#webchat",
        });
      }
    }

    if (!document.getElementById("bp-webchat")) {
      const script = document.createElement("script");
      script.id = "bp-webchat";
      script.src = "https://cdn.botpress.cloud/webchat/v2.4/inject.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // Wait a tick to ensure window.botpress is available
        setTimeout(initBotpress, 0);
      };
    } else {
      // Poll until window.botpress is available
      const interval = setInterval(() => {
        if (window.botpress) {
          clearInterval(interval);
          initBotpress();
        }
      }, 100);
      setTimeout(() => clearInterval(interval), 5000); // Stop polling after 5s
    }
  }, []);

  return (
    <div
      id="webchat"
      style={{
        width: "500px",
        height: "500px",
        margin: "0 auto",
      }}
    />
  );
}
  */
