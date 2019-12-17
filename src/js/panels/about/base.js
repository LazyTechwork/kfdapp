import React from 'react';
import {connect} from 'react-redux';

import {setPage} from "../../store/router/actions";
import {setActiveTab, setScrollPositionByID} from "../../store/vk/actions";
import {restoreScrollPosition} from "../../services/_functions";

import Icon24Article from '@vkontakte/icons/dist/24/article';
import Icon24Attachments from '@vkontakte/icons/dist/24/attachments';

import {Button, Div, FixedLayout, Group, HorizontalScroll, Panel, PanelHeader, Tabs, TabsItem} from "@vkontakte/vkui";
import logo from "../../../img/icon_white.svg";

class AboutPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: props.activeTab["ABOUT"] || "about"
        };
    }

    setTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    componentWillUnmount() {
        const {setScrollPositionByID, setActiveTab} = this.props;

        setActiveTab("ABOUT", this.state.activeTab);
        setScrollPositionByID("ABOUT_TABS");
    }

    componentDidMount() {
        restoreScrollPosition();
    }

    render() {
        const {id} = this.props;
        const boxStyle = {marginTop: 56};

        return (
            <Panel id={id}>
                <PanelHeader noShadow={true}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}><img src={logo} alt="kazanforum.doc" height="90%" style={{marginRight: '7px'}}/> О форуме
                    </div>
                </PanelHeader>
                <FixedLayout vertical="top">
                    <Tabs theme="header" type="buttons">
                        <HorizontalScroll id="ABOUT_TABS">
                            <TabsItem
                                onClick={() => this.setTab('about')}
                                selected={this.state.activeTab === 'about'}
                            >
                                О форуме
                            </TabsItem>
                            <TabsItem
                                onClick={() => this.setTab('sections')}
                                selected={this.state.activeTab === 'sections'}
                            >
                                Секции
                            </TabsItem>
                            <TabsItem
                                onClick={() => this.setTab('road')}
                                selected={this.state.activeTab === 'road'}
                            >
                                Маршрут
                            </TabsItem>
                        </HorizontalScroll>
                    </Tabs>
                </FixedLayout>
                <div style={boxStyle}>
                    {this.state.activeTab === 'about' &&
                    <Group title="О форуме">
                        <Div>
                            У тебя есть проект, но ты нуждаешься в экспертной оценке и задаешься вопросами:<br/>
                            - как исправить недостатки проекта?<br/>
                            - что делать дальше и кто мне в этом поможет?<br/>
                            - как вывести мой проект на новый уровень и стать успешным?
                        </Div>
                        <Div>
                            Тогда не забудь оставить заявку на участие в Форуме высоких технологий "kazanforum.doc", и
                            ты получишь ответы на все твои вопросы от высококлассных экспертов, преподавателей
                            Казанского Федерального университета и ведущих предпринимателей страны!
                        </Div>
                        <Div>
                            <Button before={<Icon24Article/>} size="l" stretched level="tertiary"
                                    onClick={() => window.open('https://vk.com/@kazanforumdoc-about')}>Подробнее</Button>
                        </Div>
                    </Group>}
                    {this.state.activeTab === 'sections' &&
                    <div>
                        <Group title="Инженерные технологии и робототехнические системы">
                            <Div>
                                <ul>
                                    <li>Эффективное использование городских территориальных ресурсов</li>
                                    <li>Интеллектуальные энергосистемы</li>
                                    <li>Умный дом</li>
                                    <li>Транспортная среда будущего</li>
                                    <li>Новые девайсы и гаджеты</li>
                                    <li>Биометрия и нейроинтерфейсы</li>
                                    <li>Телекоммуникации</li>
                                    <li>Радиоэлектроника</li>
                                    <li>Манипуляторы и логистические системы</li>
                                    <li>Автономные транспортные системы</li>
                                    <li>Беспилотные летательные аппараты (коптеры)</li>
                                    <li>Мехатроника</li>
                                </ul>
                            </Div>
                        </Group>
                        <Group title="Сфера IT и услуг">
                            <Div>
                                <ul>
                                    <li>Сайты и веб-приложения</li>
                                    <li>Мультимедиа и FLASH-проекты</li>
                                    <li>Расширения для браузеров</li>
                                    <li>Собственные библиотеки</li>
                                    <li>Боты в мессенджерах и социальных сетях</li>
                                    <li>Технологии обеспечения защиты информации</li>
                                    <li>Защита персональных данных</li>
                                    <li>Денежная система и инновационные методы платежа</li>
                                    <li>Облачные технологии</li>
                                    <li>Blockchain-технологии</li>
                                    <li>Игры и приложения</li>
                                    <li>Умные помощники</li>
                                    <li>BigData, машинное обучение</li>
                                    <li>Искусственный интеллект, нейронные сети</li>
                                    <li>Виртуальная и дополненная реальность</li>
                                </ul>
                            </Div>
                        </Group>
                        <Group title="Предпринимательская деятельность">
                            <Div>
                                <ul>
                                    <li>Школьные бизнес-компании</li>
                                    <li>Стартапы</li>
                                    <li>Социальные бизнес-проекты</li>
                                </ul>
                                <i>*необходимо наличие бизнес-плана, финансовой отчетности</i>
                            </Div>
                        </Group>
                    </div>}
                    {this.state.activeTab === 'road' &&
                    <Group title="Маршрут">
                        <Div>
                            Наш адрес: <b>г. Казань, территория Деревни Универсиады, д. 32 (IT-лицей КФУ)</b>
                        </Div>
                        <Div>
                            Проход на территорию Деревни Универсиады осуществляется через КПП №7, который находится
                            перед лицеем, напротив автозаправочной станции. Для прохода на
                            территорию необходимо предъявить документ, удостоверяющий личность. О том как доехать и не
                            только в документе ниже.
                        </Div>
                        <Div>
                            <Button before={<Icon24Attachments/>} size="l" stretched level="tertiary"
                                    onClick={() => window.open('https://vk.com/doc-68489482_523030748')}>Подробнее</Button>
                        </Div>
                    </Group>}
                </div>
            </Panel>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        activeTab: state.vkui.activeTab,
    };
};

const mapDispatchToProps = {
    setPage,
    setActiveTab,
    setScrollPositionByID
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPanel);