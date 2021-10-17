{{/* vim: set filetype=mustache: */}}

{{/*
Return the hasura secret/config name
*/}}
{{- define "hasura-backend-plus.hasuraConnect" -}}
{{- if .Values.hasura.enabled }}
{{- printf "%s-%s" .Release.Name "hasura" | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- if .Values.hasura.serviceName }}
{{- printf "%s-%s" .Release.Name .Values.hasura.serviceName | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- include "hasura-backend-plus.fullname" . }}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Return the s3 secret/config name
*/}}
{{- define "hasura-backend-plus.s3Connect" -}}
{{- if .Values.minio.enabled }}
{{- printf "%s-%s" .Release.Name "minio" | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- include "hasura-backend-plus.fullname" . }}
{{- end -}}
{{- end -}}

{{/*
Return the cookie secret
*/}}
{{- define "hasura-backend-plus.cookiesSecret" -}}
{{- if .Values.auth.cookies.secret }}
    {{- .Values.auth.cookies.secret }}
{{- else }}
    {{- $fullname := include "hasura-backend-plus.fullname" . }}
    {{- $secrets := (lookup "v1" "Secret" .Release.Namespace $fullname) }}
    {{- if $secrets }}
        {{- (index $secrets.data "cookies.secret") | b64dec }}
    {{- else}}
        {{- randAlphaNum 64 }}
    {{- end -}}
{{- end -}}
{{- end -}}

{{/*
re-generate encoded jwt secret 
*/}}
{{- define "hasura-backend-plus.generateJwtSecret" -}}
{{- $key := default (randAlphaNum 64) .Values.auth.jwt.key . -}}
{{- $algo := default "HS256" .Values.auth.jwt.algorith . -}}
{{- $namespace := default "https://hasura.io/jwt/claims" .Values.auth.jwt.claims.namespace . -}}
{{ printf "{\"type\": \"%s\", \"key\": \"%s\", \"claims_namespace\": \"%s\"}" $algo $key $namespace | replace "\\\"" "\"" }}
{{- end -}}

{{/*
Return the jwt secret
*/}}
{{- define "hasura-backend-plus.jwtSecret" -}}
{{- if .Values.auth.jwt.key }}
{{- include "hasura-backend-plus.generateJwtSecret" . }}
{{- else }}
    {{- $secretName := include "hasura-backend-plus.hasuraConnect" . -}}
    {{- $secrets := lookup "v1" "Secret" .Release.Namespace $secretName -}}
    {{- if $secrets }}
        {{- $jwtSecret := index $secrets.data "jwt.secret" }}
        {{- if $jwtSecret }}
{{- $jwtSecret | b64dec }}
        {{- else }}
{{- include "hasura-backend-plus.generateJwtSecret" . }}
        {{- end }}
    {{- else}}
{{- include "hasura-backend-plus.generateJwtSecret" . }}
    {{- end -}}
{{- end -}}
{{- end -}}

{{/*
Return the hasura admin secret
*/}}
{{- define "hasura-backend-plus.adminSecret" -}}
{{- if .Values.hasura.adminSecret }}
  {{- .Values.hasura.adminSecret }}
{{- else}}
  {{- $secretName := include "hasura-backend-plus.hasuraConnect" . }}
  {{- $secrets := (lookup "v1" "Secret" .Release.Namespace $secretName) }}
  {{- if $secrets }}
    {{- (index $secrets.data "adminSecret") | b64dec }}
  {{- else}}
    {{- randAlphaNum 64 }}
  {{- end -}}
{{- end -}}
{{- end -}}

{{/*
Expand the name of the chart.
*/}}
{{- define "hasura-backend-plus.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Return the protocol to use, either http or https
*/}}
{{- define "hasura-backend-plus.protocol" -}}
{{- if or (.Values.global.ingress.tls.enabled) (.Values.ingress.tls.enabled) }}
{{- printf "%s" "https" }}
{{- else }}
{{- printf "%s" "http" }}
{{- end }}
{{- end }}

{{/*
Return the default server url
*/}}
{{- define "hasura-backend-plus.serverUrl" -}}
{{- $name := include "hasura-backend-plus.name" . -}}
{{- $protocol := include "hasura-backend-plus.protocol" . -}}
{{- if .Values.global.ingress.domain }}
  {{- printf "%s://%s.%s" $protocol $name .Values.global.ingress.domain -}}
{{- else -}}
{{- if gt (len .Values.ingress.hosts) 0 }}
{{- printf "%s://%s" $protocol (index .Values.ingress.hosts 0).name -}}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "hasura-backend-plus.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "hasura-backend-plus.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "hasura-backend-plus.labels" -}}
helm.sh/chart: {{ include "hasura-backend-plus.chart" . }}
{{ include "hasura-backend-plus.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "hasura-backend-plus.selectorLabels" -}}
app.kubernetes.io/name: {{ include "hasura-backend-plus.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "hasura-backend-plus.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "hasura-backend-plus.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
