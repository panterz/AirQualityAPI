#!/bin/bash

set -eo pipefail

#carto-data.ac_puvhdapm.sub_worldpop_geography_esp_grid100m_v1 -> grid
#carto-data.ac_puvhdapm.sub_worldpop_demographics_population_esp_grid100m_v1_yearly_2010 -> population
#cartodb-gcp-backend-data-team.code_test.airquality_stations -> stations
#cartodb-gcp-backend-data-team.code_test.airquality_measurements -> measurements
#query="select * from carto-data.ac_puvhdapm.sub_worldpop_geography_esp_grid100m_v1 limit 100"
#query="select * from cartodb-gcp-backend-data-team.code_test.airquality_measurements limit 100"
#query="select * from cartodb-gcp-backend-data-team.code_test.airquality_stations"
query="with t1 as (
     select a.geoid, b.station_id, c.population
     from cartodb-gcp-backend-data-team.code_test.airquality_stations b,
     carto-data.ac_puvhdapm.sub_worldpop_geography_esp_grid100m_v1 a
     inner join carto-data.ac_puvhdapm.sub_worldpop_demographics_population_esp_grid100m_v1_yearly_2010 c
     on a.geoid = c.geoid
     where ST_Contains(a.geom, b.geom)
 )
 select avg(m.co), t.population, t.station_id
     from cartodb-gcp-backend-data-team.code_test.airquality_measurements m
     inner join t1 t on m.station_id = t.station_id
     where timeinstant between '2016-11-01T00:00:00.000Z' and '2016-11-10T00:00:00.000Z'
     group by t.population, t.station_id
"
#query="select avg(m.co) from cartodb-gcp-backend-data-team.code_test.airquality_measurements m where m.timeinstant between '2016-11-01T00:00:00.000Z' and '2016-11-10T00:00:00.000Z'"
access_token=$(curl --request POST  --url 'https://auth.carto.com/oauth/token'   --header 'content-type: application/x-www-form-urlencoded'   --data 'grant_type=client_credentials'   --data client_id=$1   --data client_secret=$2   --data 'audience=carto-cloud-native-api')
token=$(echo $access_token | jq -r .access_token)

echo $token

curl -G --request GET 'https://gcp-europe-west1.api.carto.com/v3/sql/carto_dw/query' --data-urlencode "q=$query" --header "Authorization: Bearer $token" --header 'Cache-Control: max-age=300'
