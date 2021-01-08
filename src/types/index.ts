export interface NavigationOptions {
    headerStyle: any,
    headerLeft: () => React.ReactNode,
    headerRight: () => React.ReactNode,
    headerTitle: string
}

export interface RootState {
    pressInfo?: PressInfo
}

export interface PressInfo {
    x: number,
    y: number,
    width: number,
    height: number,
    imageSource: any
}