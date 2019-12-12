import React from 'react';
import {connect} from 'react-redux';
import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';
import {renderTimetableList} from '../../services/renderers';
import moment, {now} from 'moment';
import 'moment/locale/ru';

import {Cell, Group, List, Panel, PanelHeader} from "@vkontakte/vkui";
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';

moment.locale('ru');

const timetable = [
    {
        name: 'Закрытие',
        place: 'Актовый зал',
        time1: moment('21.12.2019 16:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('21.12.2019 17:30', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Открытие',
        place: 'Актовый зал',
        time1: moment('20.12.2019 11:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('20.12.2019 11:50', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Регистрация участников / Teambuilding',
        place: 'Холл (1 этаж) / Спортивный зал',
        time1: moment('20.12.2019 09:00', 'DD.MM.YYYY HH:mm'),
        time2: moment('20.12.2019 11:00', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Организационное собрание',
        place: 'Актовый зал',
        time1: moment('20.12.2019 11:00', 'DD.MM.YYYY HH:mm'),
        time2: moment('20.12.2019 11:20', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Обед',
        place: 'Столовая',
        time1: moment('20.12.2019 11:50', 'DD.MM.YYYY HH:mm'),
        time2: moment('20.12.2019 12:30', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Образовательная программа',
        place: 'По кабинетам',
        time1: moment('20.12.2019 12:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('20.12.2019 16:00', 'DD.MM.YYYY HH:mm')
    },
];
const forumSettings = {
    start: moment('20.12.2019 09:00', 'DD.MM.YYYY HH:mm'),
    end: moment('21.12.2019 20:00', 'DD.MM.YYYY HH:mm'),
};

class HomePanelBase extends React.Component {

    componentWillMount() {
        this.updateTimetable();
        this.inter = setInterval(() => this.updateTimetable(), 60000);
        if (+now() < +forumSettings.start) {
            this.untilStart = moment.duration(forumSettings.start.diff(now()));
            this.startInt = setInterval(() => this.untilStart.subtract(1, 's'), 1000);
        }
    }


    updateTimetable() {
        let now = moment().utcOffset('+03:00');
        let tt = [], currentEvent = null;
        timetable.forEach((el) => {
            if (+now >= +el.time1 && +now < +el.time2)
                currentEvent = el;
        });
        tt = timetable.filter(el => {
            return currentEvent ? +el.time1 >= +currentEvent.time2 : +el.time1 >= +now;
        });
        tt.sort((a, b) => {
            return +a.time1 - +b.time1;
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
                {!this.untilStart && this.timetable.currentEvent &&
                <Group title="Текущее мероприятие">
                    <Cell before={<Icon56ErrorOutline style={{color: "#5181b8"}}/>}
                          description={this.timetable.currentEvent.place + " (" + this.timetable.currentEvent.time1.format('HH:mm') + ' - ' + this.timetable.currentEvent.time2.format('HH:mm') + ")"}>{this.timetable.currentEvent.name}</Cell>
                </Group>}
                {this.untilStart &&
                <Group>
                    <Cell before={<Icon56ErrorOutline style={{color: "#5181b8"}}/>}
                          description="До старта форума">{this.untilStart.locale('ru').humanize()}</Cell>
                </Group>
                }
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