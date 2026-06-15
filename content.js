(function () {
  const SHOPIFY_STORE_HANDLE = "keystonecrystals";
  const BUTTON_ID = "keystone-shopify-admin-button";

  function getProductHandleFromUrl() {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const productsIndex = pathParts.indexOf("products");

    if (productsIndex === -1 || !pathParts[productsIndex + 1]) {
      return null;
    }

    return decodeURIComponent(pathParts[productsIndex + 1]);
  }

  async function getShopifyProductId(productHandle) {
    const response = await fetch(`/products/${encodeURIComponent(productHandle)}.js`, {
      credentials: "same-origin"
    });

    if (!response.ok) {
      throw new Error("Could not load product JSON");
    }

    const product = await response.json();

    if (!product || !product.id) {
      throw new Error("Product ID not found");
    }

    return product.id;
  }

  function createButton(productHandle) {
    if (document.getElementById(BUTTON_ID)) return;

    const button = document.createElement("button");
    button.id = BUTTON_ID;
    button.textContent = "Open in Shopify";

    Object.assign(button.style, {
      position: "fixed",

      // Same margin from right and bottom, just moved inward/up from before.
      right: "32px",
      bottom: "32px",

      zIndex: "999999",
      padding: "12px 18px",
      borderRadius: "999px",
      border: "none",
      background: "#402249",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 8px 22px rgba(0,0,0,0.28)",
      lineHeight: "1",
      fontFamily: "Arial, sans-serif"
    });

    button.addEventListener("mouseenter", () => {
      button.style.filter = "brightness(1.12)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.filter = "brightness(1)";
    });

    button.addEventListener("click", async () => {
      const originalText = button.textContent;

      try {
        button.textContent = "Opening...";
        button.disabled = true;
        button.style.cursor = "wait";

        const productId = await getShopifyProductId(productHandle);

        const shopifyUrl =
          `https://admin.shopify.com/store/${SHOPIFY_STORE_HANDLE}/products/${productId}`;

        window.open(shopifyUrl, "_blank", "noopener,noreferrer");
      } catch (error) {
        console.error(error);

        // Fallback: if direct ID lookup fails, open the search page instead.
        const fallbackUrl =
          `https://admin.shopify.com/store/${SHOPIFY_STORE_HANDLE}/products?query=${encodeURIComponent(productHandle)}`;

        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      } finally {
        button.textContent = originalText;
        button.disabled = false;
        button.style.cursor = "pointer";
      }
    });

    document.body.appendChild(button);
  }

  function init() {
    const productHandle = getProductHandleFromUrl();
    if (!productHandle) return;

    createButton(productHandle);
  }

  init();
})();