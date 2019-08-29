const logger: any = (store: any) => (next: any) => (action: any) => {
    console.group(action.type)
    const oldState = store.getState()
    console.log('current state', oldState)
    console.info(`dispatching`, action)
    let result = next(action)
    const newState = store.getState()
    console.log('next state', newState)
    console.groupEnd()
    return result
}
export default logger