import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Cell, Group, List, Panel, PanelHeader} from "@vkontakte/vkui";
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';

class HomePanelBase extends React.Component {

    state = {
        showImg: false
    };

    showImg = () => {
        this.setState({showImg: true});
    };

    render() {
        const {id, setPage} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Программа форума</PanelHeader>
                <Group title="Текущее мероприятие">
                    <Cell before={<Icon56ErrorOutline style={{color: "#5181b8"}}/>}
                          description="09:00-11:00">Teambuilding</Cell>
                </Group>
                <Group title="Следующее мероприятие">
                    <Cell before={<Icon56RecentOutline style={{color: "#42b83b"}}/>}
                          description="11:00-11:20">Организационное собрание</Cell>
                </Group>
                <Group title="Остальное расписание">
                    <List>
                        <Cell description="11:30-11:50">Официальное открытие</Cell>
                        <Cell description="11:50-12:30">Обед</Cell>
                    </List>
                </Group>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);