export interface NavigationOptions {
    headerStyle: any,
    headerLeft: () => React.ReactNode,
    headerRight: () => React.ReactNode,
    headerTitle: string
}

export interface RootState {
    smallPressInfo?: PressInfo
    mediumPressInfo?: PressInfo,
    articleHeader?: any
}

export interface PressInfo {
    x: number,
    y: number,
    width: number,
    height: number,
    imageSource: any,
    borderRadius: number,
    callback: () => void
}