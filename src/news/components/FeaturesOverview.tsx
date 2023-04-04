import { useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Card, Col, Container, Row } from 'react-bootstrap';

import '../css/features_overview.css';

import { useSelector } from '../../common/store/redux';
import { RootState } from '../../app/Store';
import { optionallyFormatMessage } from '../../common/utility';
import Icon from '../../common/components/Icon';

interface FeatureContent {
  icon: string;
  title: string;
}

const features: Array<FeatureContent> = [
  {
    icon: 'pencil',
    title: 'create recipes',
  },
  {
    icon: 'search-heart',
    title: 'search recipes',
  },
  {
    icon: 'chat-left-text',
    title: 'comment and rating',
  },
  {
    icon: 'phone-flip',
    title: 'responsive design',
  },
  {
    icon: 'clock-history',
    title: 'easy setup',
  },
  {
    icon: 'building',
    title: 'administration',
  },
  {
    icon: 'git',
    title: 'open source',
  },
  {
    icon: 'globe',
    title: 'open api',
  },
];

const FeaturesOverview: React.FC = () => {
  const intl = useIntl();
  defineMessages({
    news_features_create_recipes: {
      id: 'news.features.create recipes',
      defaultMessage: 'Create Recipes',
    },
    news_features_create_recipes_description: {
      id: 'news.features.create recipes description',
      defaultMessage: 'Easily create and manage your own recipes, and combine them to menus.',
    },

    news_features_search_recipes: {
      id: 'news.features.search recipes',
      defaultMessage: 'Search Recipes',
    },
    news_features_search_recipes_description: {
      id: 'news.features.search recipes description',
      defaultMessage: 'Use powerful browsing tools to find your new favorite meals.',
    },

    news_features_comment_and_rating_recipes: {
      id: 'news.features.comment and rating',
      defaultMessage: 'Rating and Comments',
    },
    news_features_comment_and_rating_description: {
      id: 'news.features.comment and rating description',
      defaultMessage: 'Provide useful feedback on recipes and add your rating. Help your friends to avoid repeating your mistakes.',
    },

    news_features_responsive_design: {
      id: 'news.features.responsive design',
      defaultMessage: 'Responsive Design',
    },
    news_features_responsive_design_description: {
      id: 'news.features.responsive design description',
      defaultMessage: 'Manage your recipes on your large screen at home, and conveniently use your phone for cooking.',
    },

    news_features_easy_setup: {
      id: 'news.features.easy setup',
      defaultMessage: 'Easy Setup',
    },
    news_features_easy_setup_description: {
      id: 'news.features.easy setup description',
      defaultMessage: 'Getting Your instance up and running is extremely easy, thanks to docker. To focus on the important things in life.',
    },

    news_features_administration: {
      id: 'news.features.administration',
      defaultMessage: 'Administration',
    },
    news_features_administration_description: {
      id: 'news.features.administration description',
      defaultMessage: 'The app ships with a powerful administration platform, to make the house-keeping a breeze.',
    },

    news_features_open_source: {
      id: 'news.features.open source',
      defaultMessage: 'Open Source',
    },
    news_features_open_source_description: {
      id: 'news.features.open source description',
      defaultMessage: 'Built by passionate people who care. <3',
    },

    news_features_open_api: {
      id: 'news.features.open api',
      defaultMessage: 'OpenApi',
    },
    news_features_open_api_description: {
      id: 'news.features.open api description',
      defaultMessage: 'The api is documented with OpenAPI (ex. Swagger). That makes it fairly easy to integrate custom tools and queries.',
    },
  });

  const news = useSelector((state: RootState) => state.news);
  const newsList = news.items;

  const featureOverview = useMemo(() => {
    if (newsList?.filter(entry => entry.frontpage).find(entry => entry.content === '%features%')) {
      return (
        <Container className='features-overview'>
          <Row xs={1} sm={2} lg={4} className='g-4'>
            {features.map(feat => (
              <Col key={feat.title}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <Icon icon={feat.icon} variant='light' />
                      {optionallyFormatMessage(intl, 'news.features.', feat.title)}
                    </Card.Title>
                    <Card.Text>{optionallyFormatMessage(intl, 'news.features.', `${feat.title} description`)}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }, [newsList, intl]);

  return featureOverview;
};

export default FeaturesOverview;
