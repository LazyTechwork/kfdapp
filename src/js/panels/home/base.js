import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';
import {renderTimetableList} from '../../services/renderers';

import {Cell, Group, List, Panel, PanelHeader} from "@vkontakte/vkui";
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';

moment.locale('ru');
moment().utcOffset('+03:00');
const timetable = [
    {
        name: 'Teambuilding',
        place: 'Спортивный зал',
        time1: moment('11.12.2019 22:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('12.12.2019 00:30', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Закрытие',
        place: 'Актовый зал',
        time1: moment('12.12.2019 01:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('12.12.2019 02:30', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Открытие',
        place: 'Актовый зал',
        time1: moment('12.12.2019 00:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('12.12.2019 01:30', 'DD.MM.YYYY HH:mm')
    },
];

class HomePanelBase extends React.Component {

    componentWillMount() {
        this.updateTimetable();
        this.inter = setInterval(() => this.updateTimetable(), 60000);
    }

    updateTimetable() {
        let now = moment().utcOffset('+03:00');
        let tt = [], currentEvent = null;
        timetable.forEach((el) => {
            if (+now >= +el.time1 && +now < +el.time2)
                currentEvent = el;
        });
        tt = timetable.filter(el => {
            return +el.time1 >= +currentEvent.time2;
        });
        tt.sort((a, b) => {
            return +b.time1 - +a.time1;
        });
        this.timetable = {tt: tt, currentEvent: currentEvent};
    }

    componentWillUnmount() {
        clearInterval(this.inter);
    }

    render() {
        const {id} = this.props;
        let renderedTimetable = renderTimetableList(this.timetable.tt);

        return (
            <Panel id={id}>
                <PanelHeader>Программа форума</PanelHeader>
                {this.timetable.currentEvent &&
                <Group title="Текущее мероприятие">
                    <Cell before={<Icon56ErrorOutline style={{color: "#5181b8"}}/>}
                          description={this.timetable.currentEvent.place + " (" + this.timetable.currentEvent.time1.format('HH:mm') + ' - ' + this.timetable.currentEvent.time2.format('HH:mm') + ")"}>{this.timetable.currentEvent.name}</Cell>
                </Group>}
                {this.timetable.tt &&
                <div>
                    <Group title="Следующее мероприятие">
                        <Cell before={<Icon56RecentOutline style={{color: "#42b83b"}}/>}
                              description={this.timetable.tt[0].place + " (" + this.timetable.tt[0].time1.format('HH:mm') + ' - ' + this.timetable.tt[0].time2.format('HH:mm') + ")"}>{this.timetable.tt[0].name}</Cell>
                    </Group>
                    <Group title="Остальное расписание">
                        <List>
                            {renderedTimetable}
                        </List>
                    </Group>
                </div>}
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