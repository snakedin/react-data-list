export default class OptionsService {

    locale = {
        datePlaceholder: "Select a day range",
        dateResetValue: "Reset value",
        selectPlaceholder: "Select a value",
        pageSummary: "Showing <b>{begin}-{end}</b> of <b>{totalCount}</b> items."
    };

    constructor(props) {

        const optionsKeys = [
            'classNamePager',
            'enableSorting',
            'pageSizes',
            'pageShowMax',
            'showFilter',
            'showPageBar',
            'showPageNext',
            'showPagePrevious',
            'renderPageBar',
            'renderPageSummary'
        ];

        optionsKeys.forEach((key) => {
            if (props[key] !== undefined) {
                this[key] = props[key];
            }
        });

        const { locale } = props;

        if (locale !== undefined && typeof locale === 'object') {
            Object.assign(this.locale, locale);
        }
    }

    translate = (localeTag, params = {}) => {

        let phrase = this.locale[localeTag];
        const keys = Object.keys(params);

        if (keys.length > 0) {
            keys.forEach(function(key) {
                phrase = phrase.replace(`{${key}}`, params[key]);
            });
        }

        return phrase;
    };

    phrase = (value, localeTag, params = {}) => {
        return value !== null && typeof value === 'string' ?  value : this.translate(localeTag, params);
    }
};