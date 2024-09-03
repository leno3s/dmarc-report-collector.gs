# dmarc-report-collector.gs

Loader and Importer for DMARC Reports with Gmail and Google spreadsheet on Google apps script.

## Setup
### On local

1. Clone this repository
2. Enter your script id to `scriptId` in `.clasp.json`.
  - Script id can be found in Project settings on GAS web editor.
3. `npm i` to install dependencies.
4. `npx clasp push` to deploy.

### On web editor

1. Configure `001_config.gs` from editor.
  - This can also local before `npx clasp push`.
2. Run `setTrigger()` in `002_trigger.gs`.

## Output schema

| version | reporter org | email | extra contact info | report id | begin date | end date | policy domain | adkim | aspf | p   | sp  | pct | fo  | np  | record source ip | disposition | dkim | spf | reason type | comment | envelope to | envelope from | header from | dkim domain | result | selector | human result | spf domain | result | scope |
| ---     | ---          | ---   | ---                | ---       | ---        | ---      | ---           | ---   | ---  | --- | --- | --- | --- | --- | ---              | ---         | ---  | --- | ---         | ---     | ---         | ---           | ---         | ---         | ---    | ---      | ---          | ---        | ---    | ---   |