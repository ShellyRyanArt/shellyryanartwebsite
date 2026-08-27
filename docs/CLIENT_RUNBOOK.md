# Shelly Ryan Art — editing guide

Your normal website work happens at **your website address followed by `/studio`**. You do not need GitHub, Cloudflare, a deployment, or code for the tasks in this guide.

## Add an artwork

1. Open Studio and choose **Artwork**.
2. Select **Create** and choose **Artwork**.
3. Add the title, then use **Generate** beside Website address.
4. Upload the **Main image** and write a short description of the image for screen readers.
5. Add close-ups under **Detail and close-up images**. Drag images to reorder them.
6. Enter medium, dimensions, year, description, and collection/series.
7. Open **Availability & purchase**. Choose Available, Reserved, Sold, or Not for sale.
8. If a gallery is selling it, paste the complete gallery page link and set the button text, such as “Purchase at Orleans Gallery.”
9. Add a price only when wanted. Turn on **Show price on the website** to display it.
10. Check **Show on website**, choose a display-order number, and select **Publish**.

Publishing updates the live site directly. It does not wait for a code deployment.

## Edit an artwork

Open **Artwork**, select the piece, change the field, and choose **Publish**. A draft is visible only inside Studio until it is published.

To replace the main photo, open **Main image** and select or upload the replacement. Use the detail-image list for close-ups.

## Create or manage a collection

1. Open **Collections / Series** and create a collection.
2. Add its name, generate its website address, add a description, and optionally add a collection image.
3. Publish the collection.
4. Open each artwork that belongs in it, add the collection under **Collections / series**, and publish the artwork.

The website creates the collection page automatically. Artwork membership is managed on the artwork record so there is only one list to keep correct.

## Edit Home, About, Process, or Contact

Open **Pages**, choose the page, edit its text or images, and publish. Site-wide logo, contact email, footer, Instagram, and the future newsletter link are under **Site Settings**.

## Restore a mistake

Open the affected document and open its document menu/history. Review the earlier version, restore the version you want, and publish it. If the mistake affects many documents or an older version is unavailable, ask the site owner to restore the weekly Sanity backup.

The site has three recovery layers: Sanity document history and a weekly content export, weekly GitHub code snapshots, and Cloudflare deployment history. Code snapshots create a permanent dated Git tag and retain a complete recovery bundle for 90 days.

## CMS or Claude?

Use **Studio** for artwork, photos, prices, availability, gallery links, collections, page wording, contact information, and newsletter links.

Use **Design with Claude** in Studio when you want a new layout, a new type of page, a visual redesign, different mobile behavior, direct sales, print editions, or another feature that the current forms do not offer.

Fill in the short design-request form and select **Continue in Claude**. Studio copies the complete brief and opens Claude Code in the browser. Choose the Shelly Ryan Art repository and paste the brief if it is not already present. Use **Copy brief only** when you want to save the request or open Claude separately.

The request already tells Claude about the design system, CMS boundaries, checks, preview, and safe-deployment rules. Review the preview before approving a merge to the live site.

## Why Studio has blank space on the right

That space is normal on Sanity's top-level Structure screen. Select **Artwork**, **Collections / Series**, **Pages**, or **Site Settings**; Sanity opens the list and editing panes in the open area.
