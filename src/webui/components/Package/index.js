/**
 * @prettier
 * @flow
 */

import React from 'react';
import type { Element } from 'react';
import { spacing } from '../../utils/styles/mixings';

import Tag from '../Tag';
import { formatDate, formatDateDistance } from '../../utils/package';

import { IProps } from './types';
import {
  Wrapper,
  Header,
  MainInfo,
  Name,
  Version,
  Overview,
  Published,
  OverviewItem,
  Icon,
  Text,
  Details,
  Avatar,
  Author,
  Field,
  Content,
  Footer,
} from './styles';

const getInitialsName = (name: string) =>
  name
    .split(' ')
    .reduce((accumulator, currentValue) => accumulator.charAt(0) + currentValue.charAt(0), '')
    .toUpperCase();

const Package = ({ name: label, version, time, author: { name, email, avatar }, description, license, keywords = [] }: IProps): Element<Wrapper> => (
  <Wrapper className="package" to={`detail/${label}`}>
    <Header>
      <MainInfo>
        <Name>{label}</Name>
        <Version>{`v${version}`}</Version>
      </MainInfo>
      <Overview>
        {license && (
          <OverviewItem>
            <Icon name="license" pointer modifiers={spacing('margin', '4px', '5px', '0px', '0px')} />
            {license}
          </OverviewItem>
        )}
        <OverviewItem>
          <Icon name="time" pointer />
          <Published modifiers={spacing('margin', '0px', '5px', '0px', '0px')}>{`Published on ${formatDate(time)} •`}</Published>
          {`${formatDateDistance(time)} ago`}
        </OverviewItem>
      </Overview>
    </Header>
    <Content>
      <Field>
        <Text text="Author" modifiers={spacing('margin', '0px', '0px', '5px', '0px')} />
        <Author>
          <Avatar alt={name} src={avatar}>
            {!avatar && getInitialsName(name)}
          </Avatar>
          <Details>
            <Text text={name} weight="bold" />
            {email && <Text text={email} />}
          </Details>
        </Author>
      </Field>
      <Field>
        <Text text="Description" modifiers={spacing('margin', '0px', '0px', '5px', '0px')} />
        <span>{description}</span>
      </Field>
    </Content>
    {keywords.length > 0 && (
      <Footer>
        {keywords.sort().map((keyword, index) => (
          <Tag key={index}>{keyword}</Tag>
        ))}
      </Footer>
    )}
  </Wrapper>
);

export default Package;
