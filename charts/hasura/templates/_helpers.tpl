{{/* vim: set filetype=mustache: */}}

{{/*
re-generate encoded jwt secret 
*/}}
{{- define "hasura.generateJwtSecret" -}}
{{- $key := default (randAlphaNum 64) .Values.jwt.key . -}}
{{- $algo := default "HS256" .Values.jwt.algorithm . -}}
{{- $namespace := default "https://hasura.io/jwt/claims" .Values.jwt.claims.namespace . -}}
{{ printf "{\"type\": \"%s\", \"key\": \"%s\", \"claims_namespace\": \"%s\"}" $algo $key $namespace | replace "\\\"" "\"" }}
{{- end -}}

{{/*
Return the jwt secret
*/}}
{{- define "hasura.jwtSecret" -}}
{{- if .Values.jwtSecret }}
{{ include "common.tplvalues.render" (dict "value" .Values.jwtSecret "context" $) }}
{{- else }}
  {{- if .Values.jwt.key }}
  {{- include "hasura.generateJwtSecret" . }}
  {{- else }}
      {{- $secretName := include "hasura.fullname" . }}
      {{- $secrets := (lookup "v1" "Secret" .Release.Namespace $secretName) }}
      {{- if $secrets }}
          {{- $jwtSecret := index $secrets.data "jwt.secret" }}
          {{- if $jwtSecret }}
  {{- $jwtSecret | b64dec}}
          {{- else }}
  {{- include "hasura.generateJwtSecret" . }}
          {{- end }}
      {{- else}}
  {{- include "hasura.generateJwtSecret" . }}
      {{- end -}}
  {{- end -}}
{{- end -}}
{{- end -}}


{{/*
Return the hasura admin secret
*/}}
{{- define "hasura.adminSecret" -}}
{{- if .Values.adminSecret }}
  {{- .Values.adminSecret }}
{{- else}}
  {{- $secretName := include "hasura.fullname" . }}
  {{- $secrets := (lookup "v1" "Secret" .Release.Namespace $secretName) }}
  {{- if $secrets }}
    {{- (index $secrets.data "adminSecret") | b64dec }}
  {{- else}}
    {{- randAlphaNum 64 }}
  {{- end -}}
{{- end -}}
{{- end -}}

{{/*
Return the postgresql password
*/}}
{{- define "hasura.postgresPassword" -}}
{{- $password := coalesce .Values.postgresql.postgresqlPassword .Values.pgClient.external.password }}
{{- if $password }}
  {{- $password}}
{{- else}}
  {{- if .Values.postgresql.enabled }}
  {{- $secrets := (lookup "v1" "Secret" .Release.Namespace (printf "%s-postgresql" .Release.Name)) }}
  {{- if $secrets }}
    {{- (index $secrets.data "postgresql-password") | b64dec }}
  {{- else}}
    {{- randAlphaNum 32 }}
  {{- end -}}
  {{- end -}}
{{- end -}}
{{- end -}}

{{- define "call-nested" }}
{{- $dot := index . 0 }}
{{- $subchart := index . 1 }}
{{- $template := index . 2 }}
{{- include $template (dict "Chart" (dict "Name" $subchart) "Values" (index $dot.Values $subchart) "Release" $dot.Release "Capabilities" $dot.Capabilities) }}
{{- end }}

{{/*
Expand the name of the chart.
*/}}
{{- define "hasura.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "hasura.fullname" -}}
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
{{- define "hasura.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "hasura.labels" -}}
helm.sh/chart: {{ include "hasura.chart" . }}
{{ include "hasura.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "hasura.selectorLabels" -}}
app.kubernetes.io/name: {{ include "hasura.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "hasura.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "hasura.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
