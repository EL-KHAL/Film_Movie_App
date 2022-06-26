import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Search from './Search';
import { media } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../config';

const Wrapper = styled.nav`
    background-color: ${p => (p.onTop ? 'transparent' : 'rgba(0,0,0, .9)')};
    color: #fff;
    display: flex;
    height: ${p => (p.onTop ? 'auto' : '100px')};
    justify-content: space-between;
    position: fixed;
    top: 0;
    transition: background-color 0.4s;
    width: 100%;
    z-index: 100;

    ul {
        display: flex;
        margin: 0;
        padding: 40px 30px;

        ${media.tablet`display: none;`};
    }
`;

const NavItem = styled.li`
    border-bottom: 3px solid transparent;
    list-style-type: none;
    margin: 0 20px;
    transition: border 0.3s;

    &:hover {
        border-bottom: 3px solid ${theme.colors.main};
    }

    a {
        color: #fff;
        letter-spacing: 1px;
        text-decoration: none;
        text-transform: uppercase;
    }
`;

const LogoWrapper = styled.a`
    align-items: center;
    color: #fff;
    display: flex;
    font-size: 24px;
    text-decoration: none;
    font-family: Peckham Press Trial;
    margin-left: 25px;

    svg {
        height: 64px;
        margin: 20px 15px;
        width: 64px;
    }
`;

const Icon = styled.button`
    padding: 0 30px;
    display: none;
    font-size: 34px;
    color: #fff;
    ${media.tablet`display: inline-block;`};
`;

const Menu = styled.div`
    align-items: flex-end;
    display: none;
    flex-direction: column;
    position: fixed;
    right: 0;
    height: 100%;
    background-color: #000;
    transform: ${p => (p.isOpen ? 'translate3d(0px, 0px, 0px)' : 'translate3d(100%, 0px, 0px)')};
    transition: transform 0.8s;
    ${media.tablet`display: flex;`};

    ${Icon} {
        padding: 15px;
    }

    ${NavItem} {
        font-size: 20px;
        margin: 20px 50px;
    }
`;

const Logo = () => (
    <LogoWrapper href={process.env.PUBLIC_URL}>
        BENHAROUN TV
    </LogoWrapper>
);

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { onTop: true, isOpen: false };
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUnMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        window.scrollY === 0 ? this.setState({ onTop: true }) : this.setState({ onTop: false });
    };

    toggleMenu = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        const routes = [
            { path: `${process.env.PUBLIC_URL}/popular`, title: 'Popular' },
            { path: `${process.env.PUBLIC_URL}/top-rated`, title: 'Top Rated' },
            { path: `${process.env.PUBLIC_URL}/favorites`, title: 'My Favorites' },
            { path: `${process.env.PUBLIC_URL}/contact-us`, title: 'Contact' }
        ];
        return (
            <Wrapper onTop={this.state.onTop}>
                <Logo />
                <Search />
                <Icon onClick={this.toggleMenu}>
                    <FontAwesomeIcon icon="bars" />
                </Icon>
                <Menu isOpen={this.state.isOpen}>
                    <Icon onClick={this.toggleMenu}>
                        <FontAwesomeIcon icon="times" />
                    </Icon>
                    {routes.map(route => (
                        <NavItem key={route.path}>
                            <Link to={route.path}>{route.title}</Link>
                        </NavItem>
                    ))}
                </Menu>
                <ul>
                    {routes.map(route => (
                        <NavItem key={route.path}>
                            <Link to={route.path}>{route.title}</Link>
                        </NavItem>
                    ))}
                </ul>
            </Wrapper>
        );
    }
}

export default Nav;
