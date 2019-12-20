import React from 'react';
import GroupCell from '../components/GroupCell';

import {Avatar, Button, Cell, Div, Group} from "@vkontakte/vkui";
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import moment from "moment";

export const renderGroupsList = (items) => {
    let groups = null;
    if (items !== undefined && items !== null && items.length !== 0) {
        groups = items.map((group) => (
            <GroupCell
                key={group.id}
                description={group.description}
                photo={group.photo_100}
                name={group.name}/>
        ));
    }
    return groups;
};

export const renderTimetableList = (items) => {
    let tt = null;
    if (items !== undefined && items !== null && items.length !== 0) {
        tt = items.map((time, i) => {
            return i > 0 && time.time1.day() === moment().day() ? (
                <Cell key={'event-' + i} multiline={true}
                      description={time.desc}>{time.name}</Cell>
            ) : null;
        });
    }
    return tt;
};

export const renderCurList = (items) => {
    let tt = null;
    if (items !== undefined && items !== null && items.length !== 0) {
        tt = items.map((time, i) => {
            return (
                <Cell key={'curevent-' + i} multiline={true} before={<Icon56ErrorOutline style={{color: "#5181b8"}}/>}
                      description={time.desc}>{time.name}</Cell>
            );
        });
    }
    return tt;
};

export const renderPostsList = (items, authors) => {
    let posts = null;
    if (items !== undefined && items !== null && items.length !== 0) {
        posts = items.map((post, i) => {
            let ph = post.attachments[0].photo;
            let author = null;
            if (post.owner_id < 0) {
                author = authors.groups.find((group) => {
                    return group.id === post.owner_id * -1;
                });
                author = {
                    name: author.name,
                    avatar: author.photo_50,
                    username: author.screen_name
                }
            } else {
                author = authors.profiles.find((profile) => {
                    return profile.id === post.owner_id;
                });
                author = {
                    name: `${author.first_name} ${author.last_name}`,
                    avatar: author.photo_50,
                    username: author.screen_name
                };
            }
            return <Group key={'post-' + i}>
                <Cell styles={{marginBottom: '10px'}} onClick={() => window.open(`https://vk.com/${author.username}`)}
                      before={<Avatar src={author.avatar}/>} description={`@${author.username}`}>{author.name}</Cell>
                <img src={ph.sizes[ph.sizes.length - 1].url} alt="" style={{width: '100%'}}/>
                <Div style={{whiteSpace: 'pre-wrap'}}>
                    {post.text.length > 250 ? post.text.substr(0, 250) + '...' : post.text}
                </Div>
                <Div>
                    <Button onClick={() => window.open(`https://vk.com/wall${post.owner_id}_${post.id}`)} stretched
                            size="l">Перейти к посту</Button>
                </Div>
            </Group>
        });
    }

    return posts;
};