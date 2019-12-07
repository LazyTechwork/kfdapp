import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout} from '../../store/router/actions';

import {Button, Div, Group, Panel, PanelHeader, PanelSpinner} from "@vkontakte/vkui";

import * as VK from '../../services/VK';
import {bindActionCreators} from "redux";
import {renderPostsList} from "../../services/renderers";

class PhotoPanel extends React.Component {

    state = {
        posts: [],
        authors: [],
        loading: true,
        errorGetAuthToken: false
    };

    componentDidMount() {
        if (this.props.accessToken === undefined) {
            this.getAuthToken();
        } else {
            this.getPostsList();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            if (this.props.accessToken === null) {
                this.setState({
                    loading: false,
                    errorGetAuthToken: true
                });
            } else {
                this.setState({
                    loading: true,
                    errorGetAuthToken: false
                });

                this.getPostsList();
            }
        }
    }

    async getPostsList() {
        if (localStorage.getItem('posts')) {
            this.setState({
                posts: JSON.parse(localStorage.getItem('posts')),
                authors: JSON.parse(localStorage.getItem('authors')),
                loading: false
            });
            return;
        }

        let posts = await VK.APICall("newsfeed.search", {
            q: "#kazanforumdoc",
            extended: 1,
            count: 50,
            fields: "photo_50,screen_name"
        });

        console.log(posts);

        let authors = {
            groups: posts.groups,
            profiles: posts.profiles
        };
        posts = posts.items.filter(function (item) {
            return item.attachments && item.attachments.length > 0 && item.attachments[0].type === "photo";
        });

        localStorage.setItem('posts', JSON.stringify(posts));
        localStorage.setItem('authors', JSON.stringify(authors));

        this.setState({
            posts,
            authors,
            loading: false
        });
    }

    getAuthToken() {
        this.props.dispatch(VK.getAuthToken());
    }

    render() {
        const {id} = this.props;

        let renderedPosts = renderPostsList(this.state.posts, this.state.authors);

        return (
            <Panel id={id}>
                <PanelHeader>Фотографии с хештегом</PanelHeader>
                {this.state.loading && <PanelSpinner/>}
                {!this.state.loading && this.state.errorGetAuthToken && <Group>
                    <Div>Возникла ошибка при получении данных.</Div>
                    <Div>
                        <Button size="l" stretched={true} onClick={() => this.getAuthToken()}>Запросить
                            повторно</Button>
                    </Div>
                </Group>}
                {!this.state.loading && !this.state.errorGetAuthToken && renderedPosts &&
                <div>
                    {renderedPosts}
                </div>}
            </Panel>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({goBack, openPopout, closePopout, openModal}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.vkui.accessToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPanel);