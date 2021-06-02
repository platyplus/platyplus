export type RoutesConfig = Partial<
  Record<
    'home' | 'login' | 'register' | 'notFound',
    { enabled?: boolean; title?: string }
  >
>
export type AppConfig = RoutesConfig & { title?: string }
