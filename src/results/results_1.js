import React, { Component } from "react";
import {Helmet} from 'react-helmet';

export default class Results_1 extends Component {
 render() {
  return (
   <div>
    <Helmet
		title="title1"
		meta={[
			{property: 'og:title', content: "title1"},
	]} />
   </div>
  )
 }
}