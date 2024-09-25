# Taxonomy API-curls

## Regions and Municipalities

curl -X GET 'https://taxonomy.api.jobtechdev.se/v1/taxonomy/graphql?query=query%20RegionsWithMunicipalitiesForSweden%20%7B%20%20concepts(type%3A%20%22country%22)%20%7B%20%20%20%20preferred_label%20%20%20%20id%20%20%20%20narrower(type%3A%20%22region%22)%20%7B%20%20%20%20%20%20preferred_label%20%20%20%20%20%20id%20%20%20%20%20%20narrower(type%3A%20%22municipality%22)%20%7B%20%20%20%20%20%20%20%20preferred_label%20%20%20%20%20%20%20%20id%20%20%20%20%20%20%7D%20%20%20%20%7D%20%20%7D%7D' -H "Accept: application/json" -H "Content-Type: application/json" -H "api-key: "

## Occupation Fields and Occupation Groups

curl -X GET 'https://taxonomy.api.jobtechdev.se/v1/taxonomy/graphql?query=query%20OccupationFieldsAndOccupationGroups%20%7B%20%20concepts(type%3A%20%22occupation-field%22)%20%7B%20%20%20%20preferred_label%20%20%20%20id%20%20%20%20narrower(type%3A%20%22ssyk-level-4%22)%20%7B%20%20%20%20%20id%20%20%20%20%20%20preferred_label%20%20%20%20%7D%20%20%7D%7D' -H "Accept: application/json" -H "Content-Type: application/json" -H "api-key: "

## Employment-type

curl -X GET 'https://taxonomy.api.jobtechdev.se/v1/taxonomy/graphql?query=query%20EmploymentType%20%7B%20%20concepts(type%3A%20%22employment-type%22)%20%7B%20%20%20%20preferred_label%20%20%20%20id%20%20%7D%7D' -H "Accept: application/json" -H "Content-Type: application/json" -H "api-key: "

## Worktime-extent

curl -X GET 'https://taxonomy.api.jobtechdev.se/v1/taxonomy/graphql?query=query%20EmploymentType%20%7B%20%20concepts(type%3A%20%22worktime-extent%22)%20%7B%20%20%20%20preferred_label%20%20%20%20id%20%20%7D%7D' -H "Accept: application/json" -H "Content-Type: application/json" -H "api-key: "

## Workplace Environment

curl -X GET 'https://taxonomy.api.jobtechdev.se/v1/taxonomy/graphql?query=query%20EmploymentType%20%7B%20%20concepts(type%3A%20%22work-place-environment%22)%20%7B%20%20%20%20preferred_label%20%20%20%20id%20%20%7D%7D' -H "Accept: application/json" -H "Content-Type: application/json" -H "api-key: "
