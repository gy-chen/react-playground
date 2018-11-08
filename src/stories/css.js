import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

storiesOf('CSS', module)
    .add('Container Fluid', () => {
        const ContainerFluid = styled.div`
            width: 100%;
            padding-left: 16px;
            padding-right: 16px;
            margin-left: auto;
            margin-right: auto;
            background-color: pink;
        `;

        const Content = styled.p`
            display: table;
            margin-left: auto;
            margin-right: auto;
        `;

        return (
            <ContainerFluid>
                <Content>Hello Container Fluid</Content>
            </ContainerFluid>
        )
    })
    .add('Container', () => {

        const Container = styled.div`
            display: flex;
            justify-content: center;
            width: 100%;
            padding-left: 16px;
            padding-right: 16px;
            margin-left: auto;
            margin-right: auto;
            background-color: pink;

            @media (min-width: 576px) {
                width: 540px;
            }

            @media (min-width: 768px) {
                width: 720px;
            }

            @media (min-width: 992px) {
                width: 960px;
            }

            @media (min-width: 1200px) {
                width: 1140px;
            }
        `;

        const Content = styled.p`
        `;

        return (
            <Container>
                <Content>Container. Try it adjust window's witdth.</Content>
            </Container>
        )
    })
    .add('Card', () => {

        const Card = styled.div`
            display: flex;
            border: 1px solid rgba(0, 0, 0, .125);
            border-radius: .25rem;
            width: 18rem;
            flex-direction: column;
        `;

        const CardTitle = styled.h5`
            padding: 0;
            margin: 0;
            margin-bottom: .75rem;
            font-size: 1.25rem;
        `;

        const CardContent = styled.div`
            padding: 1.25rem;
        `;

        return (
            <Card>
                <CardContent>
                    <CardTitle>Hello Card</CardTitle>
                    Content of card
                </CardContent>
            </Card>
        );
    })
    .add('Navbar', () => {
        const Navbar = styled.div`
            display: flex;
            padding: 1rem .5rem;
            justify-content: space-between;

            background-color: #f8f9fa;
        `;

        const NavBrand = styled.div`
            padding-left: .5rem;
            padding-right: .5rem;
            font-size: 1.25rem;
        `;

        const Nav = styled.ol`
            display: flex;
            margin: 0;
            padding: 0;
            list-style: none;
        `;

        const NavItem = styled.li`
            padding-left: 1rem;
            padding-right: 1rem;

            color: rgba(0, 0, 0, .5);
        `;

        const NavItemLink = styled.a`
            color: rgba(0, 0, 0, .5);
            text-decoration: none;

            &:hover {
                color: rgba(0, 0, 0, .7);
            }
        `;

        return (
            <Navbar>
                <NavBrand>NavBrand</NavBrand>
                <Nav>
                    <NavItem><NavItemLink href="#">Nav Item 1</NavItemLink></NavItem>
                    <NavItem>Nav Item 2</NavItem>
                    <NavItem>Nav Item 3</NavItem>
                </Nav>
            </Navbar>
        );
    })
    .add('Navbar: Collpase', () => {
        const Navbar = styled.div`
            display: flex;
            flex-wrap: wrap;
            padding: 1rem .5rem;
            justify-content: space-between;

            background-color: #f8f9fa;
        `;

        const NavBrand = styled.div`
            padding-left: .5rem;
            padding-right: .5rem;
            font-size: 1.25rem;
        `;

        const Nav = styled.ol`
            display: flex;
            margin: 0;
            padding: 0;
            list-style: none;
            flex-direction: column;

            @media (min-width: 768px) {
                flex-direction: row;
            }
        `;

        const NavCollpase = styled.div`
            flex-basis: 100%;

            @media (min-width: 768px) {
                flex-basis: auto;
            }
        `;

        const NavItem = styled.li`
            padding-left: .5rem;
            color: rgba(0, 0, 0, .5);

            @media (min-width: 768px) {
                padding-left: 1rem;
                padding-right: 1rem;
            }
        `;

        const NavItemLink = styled.a`
            color: rgba(0, 0, 0, .5);
            text-decoration: none;

            &:hover {
                color: rgba(0, 0, 0, .7);
            }
        `;

        return (
            <Navbar>
                <NavBrand>NavBrand</NavBrand>
                <NavCollpase>
                    <Nav>
                        <NavItem><NavItemLink href="#">Nav Item 1</NavItemLink></NavItem>
                        <NavItem>Nav Item 2</NavItem>
                        <NavItem>Nav Item 3</NavItem>
                    </Nav>
                </NavCollpase>
            </Navbar>
        );
    });