import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import React from "react"
import Masonry from "react-masonry-css"

import Card from "../components/Card"
import SEO from "../components/SEO"
import TransitionContainer from "../components/TransitionContainer"
import worksDataTransformer from "../utils/worksDataTransformer"

export const query = graphql`
  query Work {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "contents/worksContent/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          url
          thumbnail {
            childImageSharp {
              fluid(maxHeight: 250, maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          imgs {
            childImageSharp {
              fluid(maxHeight: 760, maxWidth: 1280) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        html
      }
    }
  }
`

interface WorkProps {
  data: any
}

export const WorksPage: React.FC<WorkProps> = ({ data }) => {
  const works = worksDataTransformer(data)
  const intl = useIntl()

  return (
    <TransitionContainer>
      <SEO
        title={intl.formatMessage({ id: "meta.title.WorksPage" })}
        description={intl.formatMessage({ id: "meta.description.WorksPage" })}
      />
      <Masonry
        breakpointCols={{
          default: 3,
          1024: 2,
          800: 1,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {works.map((work, index) => (
          <Card data={work} key={index} />
        ))}
      </Masonry>
    </TransitionContainer>
  )
}

export default WorksPage
