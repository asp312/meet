export const state = () => ({
    filters: {
        brand: [],
        minCost: 0,
        maxCost: 10000000,
        rakeOff: false,
        sex: [],
        size: [],
        type: [],
        popular: 'gross'
    },
    tags: [
        'Очистить все',
        'Новинки',
        'Кросовки',
        'Nike'
    ]
})

export const mutations = {
    changeFilters (state, filter) {
        let name = filter.dataType
        state.filters[name] = filter.filsters
    },
    changeRangeFilters (state, rangeFilters) {
        if (rangeFilters.maxCost === 'notfull') {
            state.filters.minCost = rangeFilters.minCost
            return state.filters.rakeOff = true
        }
        state.filters.rakeOff = false
        state.filters.maxCost = rangeFilters.maxCost
        state.filters.minCost = rangeFilters.minCost
    },
    changeTags (state, tags) {
        state.tags = tags
    },
    delTag (state, tag) {
        let idx = state.tags.findIndex(t => {
            return t === tag
        })
        state.tags.splice(idx, 1)
    },
    pushTag (state, tag) {
        state.tags = [...state.tags, tag]
    },
    clearFilter (state, filter) {
        state.filters[filter] = []
    }
}

export const actions = {
    setFilters ({ commit }, filter) {
        commit('changeFilters', filter)
    },
    setRangeFilters ({ commit }, rangeFilters) {
        commit('changeRangeFilters', rangeFilters)
    },
    setTags ({ commit }, tags) {
        commit('changeTags', tags)
    },
    removeTag({ commit }, tag) {
        commit('delTag', tag)
    },
    addTag({ commit }, tag) {
        commit('pushTag', tag)
    },
    clearFilter ({ commit }, filter) {
        commit('clearFilter', filter)
    }
}

export const getters = {
    getBrands: state => state.filters,
    getTags: state => state.tags
}