export function filterRoute(authRoute: any, role: string) {
  return authRoute.filter((item: any) => {
    if (item.allows.includes(role)) {
      if (item.children && item.children.length > 0) {
        item.children = filterRoute(item.children, role)
      }
      return true
    }
  })
}
