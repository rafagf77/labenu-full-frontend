import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import ErrorPage from '../screens/ErrorPage/ErrorPage'
import FeedPage from '../screens/FeedPage/FeedPage'
import LoginPage from '../screens/LoginPage/LoginPage'
import PostPage from '../screens/PostPage/PostPage'
import ImagePage from '../screens/ImagePage/ImagePage'
import SignUpPage from '../screens/SignUpPage/SignUpPage'
import CollectionsListPage from '../screens/CollectionsListPage/CollectionsListPage'
import CollectionPage from '../screens/CollectionPage/CollectionPage'
import FilterPage from '../screens/FilterPage/FilterPage'

const Router = () => {
    return (    
        <BrowserRouter>
            <Switch>
                <Route exact path = {['/feed','/']}>
                    <FeedPage />
                </Route>
                <Route exact path = {'/login'}>
                    <LoginPage />
                </Route>
                <Route exact path = {'/post'}>
                    <PostPage />
                </Route>
                <Route exact path = {'/image/:id'}>
                    <ImagePage />
                </Route>
                <Route exact path = {'/signup'}>
                    <SignUpPage />
                </Route>
                <Route exact path = {'/collections'}>
                    <CollectionsListPage />
                </Route>
                <Route exact path = {'/collection/:id'}>
                    <CollectionPage />
                </Route>
                <Route exact path = {'/filter/:id'}>
                    <FilterPage />
                </Route>
                <Route>
                    <ErrorPage />
                </Route>
            </Switch>
        </BrowserRouter>   
    )
}

export default Router