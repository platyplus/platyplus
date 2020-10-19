{{/* vim: set filetype=mustache: */}}

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
{{- define "hasura-backend-plus.server-url" -}}
{{- $name := include "hasura-backend-plus.name" . -}}
{{- $protocol := include "hasura-backend-plus.protocol" . -}}
{{- if .Values.global.ingress.domain }}
  {{- printf "%s://%s.%s" $protocol $name .Values.global.ingress.domain -}}
{{- else -}}
{{- if gt (len .Values.ingress.hosts) 0 }}
{{- printf "%s://%s" $protocol (index .Values.ingress.hosts 0) -}}
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
