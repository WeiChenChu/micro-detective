# Reviewed real microscopy assets

Reserved for manually reviewed local micrographs. No real image is included in v0.24-dev.

Keep existing SVG illustrations. Add each real image as a NEW `images` entry with
`type: "real"`, `placeholder: false`, bilingual alt/caption, and `credit` containing
creator, source, license, sourceUrl, licenseUrl (when applicable), and actual changes.
Then set `realImageExamples[illustrationId].imageId` to the new ID.

Do not invent scale bars or imply two specimens are the same. Check the caption,
sample, imaging method, signal interpretation and licensing before activation.
Original files and candidate provenance stay in `source_images/` and `image_credits/`.
Their presence alone is not approval to publish an asset.
