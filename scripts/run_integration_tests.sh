#!/bin/bash

set -eo pipefail

access_token=$(curl --request POST  --url 'https://auth.carto.com/oauth/token'   --header 'content-type: application/x-www-form-urlencoded'   --data 'grant_type=client_credentials'   --data client_id=$1   --data client_secret=$2   --data 'audience=carto-cloud-native-api')

export CARTO_KEY=$(echo $access_token | jq -r .access_token)

yarn run test-integration
