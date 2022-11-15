#!/bin/bash

set -eo pipefail

query="select * from carto-do-public-data.worldpop.demographics_population_esp_grid100m_v1_yearly_2010 limit 100"
access_token=$(curl --request POST  --url 'https://auth.carto.com/oauth/token'   --header 'content-type: application/x-www-form-urlencoded'   --data 'grant_type=client_credentials'   --data client_id=$1   --data client_secret=$2   --data 'audience=carto-cloud-native-api')
token=$(echo $access_token | jq -r .access_token)

echo $token

curl -G --request GET 'https://gcp-europe-west1.api.carto.com/v3/sql/carto_dw/query' --data-urlencode "q=$query" --header "Authorization: Bearer $token" --header 'Cache-Control: max-age=300'
