type HistoryType<T> = {
    addHistoryItem: (item: T) => void
    undo: () => T | null
    redo: () => T | null
}

function createHistory<T>(initHistoryAction: T): HistoryType<T> {
    let nextItemIndex = 0
    const historyItems: T[] = [initHistoryAction]

    return {
        addHistoryItem: (item: T) => {
            historyItems.length = nextItemIndex + 1
            historyItems.push(item)
            ++nextItemIndex
        },
        undo: () => {
            if (nextItemIndex <= 0) {
                return null
            }
            --nextItemIndex
            return historyItems[nextItemIndex]
        },
        redo: () => {
            if (nextItemIndex >= historyItems.length - 1) {
                return null
            }
            ++nextItemIndex
            return historyItems[nextItemIndex]
        },
    }
}

export { createHistory }
