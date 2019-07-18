import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { Portal } from '..';

// locale data
const locales = {
    'en-US': require('../../locale/en-US.json'),
    'zh-CN': require('../../locale/zh-CN.json'),
};

export default class App extends Component {
    state = { initDone: false };

    componentDidMount() {
        const cookieLocale = this.getCookie("org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE");
        let language = cookieLocale ? cookieLocale.replace('_', '-') : "en-US";
        if (!locales[language]) {
            language = "en-US";
        }
        this.loadLocales(language);
    }

    loadLocales(locale) {
        intl.init({ currentLocale: locale, locales }).then(() => {
            this.setState({ initDone: true });
        });
    }

    getCookie = (name) => {
        let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        let arr = document.cookie.match(reg);
        return arr ? unescape(arr[2]) : null;
    }

    render() {
        return (
           
            this.state.initDone && (<Portal />)
        );
    }
}
