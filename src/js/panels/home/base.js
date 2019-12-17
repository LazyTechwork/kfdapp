import React from 'react';
import {connect} from 'react-redux';
import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';
import {renderTimetableList} from '../../services/renderers';
import moment from 'moment';
import 'moment/locale/ru';

import {Cell, Group, List, Panel, PanelHeader} from "@vkontakte/vkui";
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';

import logo from '../../../img/icon_white.svg';

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
        time1: moment('16.12.2019 17:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('16.12.2019 20:50', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Регистрация участников / Teambuilding',
        place: 'Холл (1 этаж) / Спортивный зал',
        time1: moment('16.12.2019 21:00', 'DD.MM.YYYY HH:mm'),
        time2: moment('16.12.2019 22:00', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Регистрация участников / Teambuilding',
        place: 'Холл (1 этаж) / Спортивный зал',
        time1: moment('16.12.2019 22:00', 'DD.MM.YYYY HH:mm'),
        time2: moment('16.12.2019 23:00', 'DD.MM.YYYY HH:mm')
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
    start: moment('17.12.2019 18:40', 'DD.MM.YYYY HH:mm'),
    end: moment('17.12.2019 18:43', 'DD.MM.YYYY HH:mm'),
};

class HomePanelBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timetable: null
        };
    }

    componentWillMount() {
        this.updateTimetable();
        this.inter = setInterval(() => this.updateTimetable(), 2500);
    }


    updateTimetable() {
        let now = moment().utcOffset('+03:00');
        let tt = [], currentEvent = null;
        if (+now < +forumSettings.start || this.untilStart && this.untilStart.milliseconds() > 0)
            this.untilStart = moment.duration(forumSettings.start.diff(now));
        else if (this.untilStart)
            this.untilStart = null;

        if (+now >= +forumSettings.end)
            this.setState({isEnded: true});

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
        this.setState({timetable: {tt: tt, currentEvent: currentEvent}});
    }

    componentWillUnmount() {
        clearInterval(this.inter);
        clearInterval(this.startInt);
    }

    render() {
        const {id} = this.props;
        let renderedTimetable = renderTimetableList(this.state.timetable.tt);

        return (
            <Panel id={id} theme={this.state.isEnded ? "white" : ""}>
                <PanelHeader>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}><img src={logo} alt="kazanforum.doc" height="90%" style={{marginRight: '7px'}}/> kazanforum.doc
                    </div>
                </PanelHeader>
                {!this.state.isEnded && !this.untilStart && this.state.timetable.currentEvent &&
                <Group title="Текущее мероприятие">
                    <Cell before={<Icon56ErrorOutline style={{color: "#5181b8"}}/>}
                          description={this.state.timetable.currentEvent.place + " (" + this.state.timetable.currentEvent.time1.format('HH:mm') + ' - ' + this.state.timetable.currentEvent.time2.format('HH:mm') + ")"}>{this.state.timetable.currentEvent.name}</Cell>
                </Group>}
                {this.untilStart &&
                <Group>
                    <Cell before={<Icon56ErrorOutline style={{color: "#5181b8"}}/>}
                          description="До старта форума">{this.untilStart.locale('ru').humanize().charAt(0).toUpperCase() + this.untilStart.locale('ru').humanize().slice(1)}</Cell>
                </Group>
                }
                {!this.state.isEnded && this.state.timetable.tt &&
                <div>
                    <Group title="Следующее мероприятие">
                        <Cell before={<Icon56RecentOutline style={{color: "#42b83b"}}/>}
                              description={this.state.timetable.tt[0].place + " (" + this.state.timetable.tt[0].time1.format('HH:mm') + ' - ' + this.state.timetable.tt[0].time2.format('HH:mm') + ")"}>{this.state.timetable.tt[0].name}</Cell>
                    </Group>
                    <Group title="Мероприятия на сегодня">
                        <List>
                            {renderedTimetable}
                        </List>
                    </Group>
                </div>}
                {this.state.isEnded &&
                <div>
                    <Cell>Форум завершён!</Cell>
                </div>
                }
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