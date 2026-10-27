#!/bin/sh
# Builds the two static variants the end-to-end tests run against:
#   .e2e/formspree  with a fake Formspree form ID (every request to formspree.io
#                   is intercepted by the tests; nothing is ever sent)
#   .e2e/mailto     without an ID (the email-app fallback)
set -eu
cd "$(dirname "$0")/.."
rm -rf .e2e
mkdir -p .e2e
NEXT_PUBLIC_FORMSPREE_ID=e2e-test-form npx --no-install next build
cp -r out .e2e/formspree
NEXT_PUBLIC_FORMSPREE_ID= npx --no-install next build
cp -r out .e2e/mailto
