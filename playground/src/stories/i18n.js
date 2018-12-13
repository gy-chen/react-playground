import _ from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, withRouter, Link } from 'react-router-dom';
import { LocalizationProvider, Localized } from 'fluent-react/compat';
import { FluentBundle } from 'fluent/compat';
import { negotiateLanguages as fltNegociateLanaguages } from 'fluent-langneg/compat';
import { storiesOf } from '@storybook/react';

const MESSAGES_ALL = {
    'en': `
hello = Hello World
    `,
    'zh': `
hello = 嗨！世界
    `
}

const LOCALES = Object.keys(MESSAGES_ALL);

const DEFAULT_LOCALE = 'en';

/**
 * iI any of langauges that user prefer is avaiable?
 * 
 * @param {list} userLocales list of locales that user want to use
 */
function isUserLocalesAvaiable(userLocales) {
    const baseUserLocales = [];
    for (const userLocale of userLocales) {
        baseUserLocales.push(userLocale.split('-')[0]);
    }

    const supported = negotiateLanguages(userLocales);
    const matched = _.intersection(supported, _.union(userLocales, baseUserLocales));

    return !_.isEmpty(matched);
}

/**
 * Negotiage user prefered langaues
 * 
 * @param {list} userLocales list of locales that user want to use
 */
function negotiateLanguages(userLocales) {
    const supported = fltNegociateLanaguages(userLocales,
        LOCALES, { defaultLocale: DEFAULT_LOCALE });

    return supported;
}

/**
 * Generate fluent messages bundle with user perfered language.
 * 
 * If user locales are not availble, use default language instead.
 * 
 * @param {list} userLocales list of locales that user want to user
 */
function* generateBundles(userLocales) {

    const locales = negotiateLanguages(userLocales);

    for (const locale of locales) {
        const bundle = new FluentBundle(locale);
        bundle.addMessages(MESSAGES_ALL[locale]);
        yield bundle;
    }
}

const HelloWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Hello = () => (<HelloWrapper>
    <Localized id="hello">Hello</Localized>
    <Link to="/zh">Change locale to zh</Link>
    <Link to="/en">Change locale to en</Link>
    <Link to="/unknown">Change locale to unknown locale</Link>
</HelloWrapper>);


class AppSubRoutes extends Component {

    render() {
        const { match } = this.props;

        return (
            <Route path={`${match.url}`} component={Hello} />
        );
    };
}

AppSubRoutes = withRouter(AppSubRoutes);

class LocalizedAppRoutes extends Component {

    constructor(props) {
        super(props);

        this._generateBundles = this._generateBundles.bind(this);
        this.state = {
            bundles: this._generateBundles()
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.locale !== prevProps.match.params.locale) {
            this.setState({
                bundles: this._generateBundles()
            });
        }
    }

    _generateBundles() {
        const { match: { params: { locale } }, history } = this.props;

        if (!isUserLocalesAvaiable([locale])) {
            history.replace(`/${DEFAULT_LOCALE}`);
        }

        return generateBundles([locale]);
    }

    render() {
        const { bundles } = this.state;

        return (
            <LocalizationProvider bundles={bundles}>
                <AppSubRoutes />
            </LocalizationProvider>
        );
    }
}


class App extends Component {

    render() {
        return (
            <Router>
                <Route path="/:locale" component={LocalizedAppRoutes} />
            </Router>
        )
    }
}

storiesOf('i18n', module)
    .add('Fluent.js', () => <App />);