# Shopify Link Embed

A lightweight local Chrome extension that adds an **Open in Shopify** button to Shopify storefront product pages.

When you are viewing a product page on your own storefront, the extension detects the product handle from the URL, fetches the product’s Shopify ID, and opens the matching product editor directly inside Shopify Admin.

For example:

```text
https://yourstore.com/products/example-product
```

Adds a button that links to:

```text
https://admin.shopify.com/store/your-store-handle/products/123456789
```

## What it does

* Detects when you are on a Shopify product page
* Reads the product handle from the storefront URL
* Fetches the product JSON from the storefront
* Extracts the Shopify product ID
* Adds a floating **Open in Shopify** button to the page
* Opens the product directly in Shopify Admin
* Falls back to Shopify Admin product search if the direct product ID lookup fails

## Why this is useful

Shopify storefront product pages use readable handles, like:

```text
/products/rose-quartz-heart
```

But Shopify Admin product editor pages use numeric product IDs, like:

```text
/products/7501788414197
```

This extension bridges that gap so store owners can jump from a live product page directly to the product editor.

## Setup

### 1. Download or clone this repo

```bash
git clone https://github.com/lightworkerscrystals/Shopify-Link-Embed.git
```

### 2. Open the extension folder

Make sure the folder contains:

```text
manifest.json
content.js
README.md
```

### 3. Customize for your store

Open `manifest.json` and change the storefront domain match:

```json
"matches": ["https://keystonecrystals.com/products/*"]
```

Replace `keystonecrystals.com` with your own Shopify storefront domain:

```json
"matches": ["https://yourstore.com/products/*"]
```

Then open `content.js` and update the Shopify Admin store handle:

```js
const SHOPIFY_STORE_HANDLE = "keystonecrystals";
```

Replace it with your Shopify Admin store handle.

You can find this in your Shopify Admin URL:

```text
https://admin.shopify.com/store/YOUR-STORE-HANDLE
```

For example, if your Shopify Admin URL is:

```text
https://admin.shopify.com/store/my-crystal-shop
```

Then use:

```js
const SHOPIFY_STORE_HANDLE = "my-crystal-shop";
```

## Loading the extension in Chrome

1. Open Chrome.
2. Go to:

```text
chrome://extensions
```

3. Turn on **Developer mode**.
4. Click **Load unpacked**.
5. Select this extension folder.
6. Visit one of your storefront product pages.

You should now see an **Open in Shopify** button on the page.

## Updating the extension

After editing `manifest.json` or `content.js`:

1. Go back to:

```text
chrome://extensions
```

2. Find the extension.
3. Click the reload icon.
4. Refresh your storefront product page.

## Notes

This is designed as a simple local utility for Shopify store owners.

It does not require:

* Shopify API keys
* A private app
* OAuth
* A backend server
* Any paid hosting

The extension works by using Shopify’s public product JSON endpoint:

```text
/products/product-handle.js
```

That endpoint provides the product ID needed to open the Shopify Admin editor directly.

## Fallback behavior

If the product ID cannot be found, the extension opens Shopify Admin product search using the product handle instead.

That way, the button still remains useful even if the direct editor link cannot be generated.

## License

MIT
