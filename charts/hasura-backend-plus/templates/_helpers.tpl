{{/* vim: set filetype=mustache: */}}
{{/*
Return the proper host name
*/}}
{{- define "hostname" -}}
{{/*
Helm 2.11 supports the assignment of a value to a variable defined in a different scope,
but Helm 2.9 and 2.10 doesn't support it, so we need to implement this if-else logic.
Also, we can't use a single if because lazy evaluation is not an option
*/}}
{{- if .Values.global }}
    {{- if .Values.global.hostname }}
        {{- printf "%s" .Values.global.hostname -}}
    {{- else }}
        {{- printf "%s" (required "Valid hostname is required" .Values.hostname) -}}
    {{- end -}}
{{- else }}
    {{- printf "%s" (required "Valid hostname is required" .Values.hostname) -}}
{{- end -}}
{{- end -}}


{{/*
Expand the name of the chart.
*/}}
{{- define "hasura-backend-plus.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
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
