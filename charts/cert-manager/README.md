# Cert-manager Helm Chart

Cert-manager pre-configured with Let's Encrypt.

## TL;DR

```sh
helm repo add platydev https://charts.platy.dev
helm install my-release platydev/cert-manager --namespace cert-manager --create-namespace
```

## Introduction

This chart installs Cert-manager, its Custom Resource Definitions and `production` and `staging` Let's Encrypt Cluster Issuers.

## Prerequisites

- Kubernetes 1.12+
- Helm v3.3.4+

## Installing the Chart

To install the chart with the release name my-release:

```sh
helm repo add platydev https://charts.platy.dev
helm install my-release platydev/cert-manager --namespace cert-manager --create-namespace
```

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```sh
helm delete my-release --namespace cert-manager
```

## Parameters

The following table lists the configurable parameters of the chart and their default values.

| Parameter                   | Description                                                 | Default                                   |
| --------------------------- | ----------------------------------------------------------- | ----------------------------------------- |
| `cert-manager.installCRDs`  | Install cert-manager Custom Resource Definitions            | `true`                                    |
| `cert-manager.featureGates` |                                                             | `ExperimentalCertificateControllers=true` |
| `cert-manager.*`            | Any other options from the official cert-manager Helm Chart |                                           |
| `email`                     | Email required in the cluster issuers                       | `nil`                                     |

## Contribute

This chart may not fit with your needs yet, as some options may still be missing, or may need further documentation. Don't hesitate to open an issue of to ask your questions through [Discord](https://discord.gg/Bez8xY).
