import React from 'react';
import {connect} from 'react-redux';
import vkConnect from "@vkontakte/vk-connect";
import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';
import {renderCurList, renderTimetableList} from '../../services/renderers';
import moment from 'moment';
import 'moment/locale/ru';

import {Button, Cell, Group, List, Panel, PanelHeader} from "@vkontakte/vkui";
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';
import Icon56FireOutline from '@vkontakte/icons/dist/56/fire_outline';
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
        name: 'Регистрация участников \n Teambuilding',
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
        name: 'Открытие',
        place: 'Актовый зал',
        time1: moment('20.12.2019 11:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('20.12.2019 11:50', 'DD.MM.YYYY HH:mm')
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
    {
        name: 'Работа над проектами \n Feedback-сессия',
        place: 'Группа 1 - 104 и 105 каб. \n Группа 2 - 325 и 331 каб. \n Группа 3 - 322 и 323 каб.',
        time1: moment('20.12.2019 16:00', 'DD.MM.YYYY HH:mm'),
        time2: moment('20.12.2019 17:30', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Ужин',
        place: 'Столовая',
        time1: moment('20.12.2019 17:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('20.12.2019 18:20', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Завтрак',
        place: 'Столовая',
        time1: moment('21.12.2019 08:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('21.12.2019 09:00', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Защита проектов',
        place: 'Группа 1 - 325 каб. \n Группа 2 - библиотека \n Группа 3 - 323 каб.',
        time1: moment('21.12.2019 09:00', 'DD.MM.YYYY HH:mm'),
        time2: moment('21.12.2019 13:00', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Обед',
        place: 'Столовая',
        time1: moment('21.12.2019 12:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('21.12.2019 14:00', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Экскурсия по лицею',
        place: 'Сбор в холле',
        time1: moment('21.12.2019 13:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('21.12.2019 14:00', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Итоговое мероприятие',
        place: 'Актовый зал',
        time1: moment('21.12.2019 14:00', 'DD.MM.YYYY HH:mm'),
        time2: moment('21.12.2019 16:00', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Фотосессия',
        place: 'Холл (2 этаж)',
        time1: moment('21.12.2019 16:00', 'DD.MM.YYYY HH:mm'),
        time2: moment('21.12.2019 16:30', 'DD.MM.YYYY HH:mm')
    },
    {
        name: 'Закрытие \n Церемония награждения',
        place: 'Актовый зал',
        time1: moment('21.12.2019 16:30', 'DD.MM.YYYY HH:mm'),
        time2: moment('21.12.2019 17:30', 'DD.MM.YYYY HH:mm')
    }
];
const forumSettings = {
    start: moment('20.12.2019 09:30', 'DD.MM.YYYY HH:mm'),
    end: moment('21.12.2019 18:30', 'DD.MM.YYYY HH:mm'),
};

class HomePanelBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timetable: null,
            isStarted: true,
            isEnded: false
        };
    }

    componentWillMount() {
        this.updateTimetable();
        this.inter = setInterval(() => this.updateTimetable(), 2500);
        timetable.map((el) => {
            if (typeof el.desc !== 'undefined')
                return;
            el.desc = el.place.replace(/(?:\r\n|\r|\n)/g, '\n').split('\n').map(row => (
                <div><span>{row}</span><br/></div>));
            el.name = el.name.replace(/(?:\r\n|\r|\n)/g, '\n').split('\n').map(row => (
                <div><span>{row}</span><br/></div>));
            el.desc.push(<div><span>{el.time1.format('HH:mm') + ' - ' + el.time2.format('HH:mm')}</span></div>);
        });
    }


    updateTimetable() {
        let now = moment().utcOffset('+03:00');
        let tt = [], currentEvent = [];
        if (+now < +forumSettings.start || (this.untilStart && this.untilStart.milliseconds() > 0)) {
            this.untilStart = moment.duration(forumSettings.start.diff(now));
            this.setState({isStarted: false, isEnded: false});
        } else if (this.untilStart) {
            this.untilStart = null;
            this.setState({isStarted: true, isEnded: false});
        }
        if (+now >= +forumSettings.end)
            this.setState({isEnded: true, isStarted: false});

        timetable.forEach((el) => {
            if (+now >= +el.time1 && +now < +el.time2)
                currentEvent.push(el);
        });
        tt = timetable.filter(el => {
            return currentEvent.length > 0 ? +el.time1 >= +currentEvent[currentEvent.length - 1].time2 : +el.time1 >= +now;
        });
        tt.sort((a, b) => {
            return +a.time1 - +b.time1;
        });
        this.setState({timetable: {tt: tt, currentEvent: currentEvent}});
    }

    componentWillUnmount() {
        clearInterval(this.inter);
    }

    render() {
        const {id} = this.props;
        let renderedCur = renderCurList(this.state.timetable.currentEvent);
        let renderedTimetable = renderTimetableList(this.state.timetable.tt);

        return (
            <Panel id={id} theme={this.state.isEnded ? "white" : "gray"}>
                <PanelHeader>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}><img src={logo} alt="kazanforum.doc" height="85%" style={{marginRight: '7px'}}/></div>
                </PanelHeader>
                {this.untilStart &&
                <Group>
                    <Cell multiline={true} before={<Icon56ErrorOutline style={{color: "#5181b8"}}/>}
                          description="До старта форума">{this.untilStart.locale('ru').humanize().charAt(0).toUpperCase() + this.untilStart.locale('ru').humanize().slice(1)}</Cell>
                </Group>
                }
                {!this.state.isEnded && this.state.isStarted && this.state.timetable.currentEvent &&
                <Group title="Текущее мероприятие">
                    {renderedCur}
                </Group>}
                {!this.state.isEnded && this.state.isStarted && this.state.timetable.tt &&
                <div>
                    <Group title="Следующее мероприятие">
                        <Cell multiline={true} before={<Icon56RecentOutline style={{color: "#42b83b"}}/>}
                              description={this.state.timetable.tt[0].desc}>{this.state.timetable.tt[0].name}</Cell>
                    </Group>
                    <Group title="Мероприятия на сегодня">
                        <List>
                            {renderedTimetable}
                        </List>
                    </Group>
                </div>}
                {this.state.isEnded && <Cell style={{textAlign: 'center'}}><h1>Форум завершён!</h1></Cell>}

                <Group>
                    <Cell size="l" multiline={true}
                          before={<Icon56FireOutline style={{color: "#f0004b"}}/>}
                          bottomContent={<Button level="primary"
                                                 onClick={() => vkConnect.send("VKWebAppJoinGroup", {"group_id": 68489482})}>Подписаться</Button>}>Группа
                        ВКонтакте</Cell>
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