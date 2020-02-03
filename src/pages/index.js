import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '../styles/index.sass'
import classNames from 'classnames'

const FeatureItem = ({title, children}) => {
	return <div className="coreFeatureList-item">
		<h3 className="coreFeature-title">{title}</h3>
		<div className="coreFeature-text">{children}</div>
	</div>
};

const UseCase = ({title, children, isActive}) => {
return <div className={classNames("usecases-item", isActive ? 'is-active' : null)}>
  <h3 className="usecases-item-title">{title}</h3>
  <div className="usecases-item-text">{children}</div>
</div>
};

const UseCaseList = ({items}) => {
	const [selected, select] = React.useState(0);
	return <div className="usecases" id="usecases">
		<div className="usecases-in">
			<h2 className="usecases-title">Contember can be used in many ways</h2>
		</div>
		<div className="usecases-nav">
			<div className="usecases-nav-items">
				{Object.keys(items).map((it, key) => <a key={key} onClick={() => select(key)}
																								className={classNames("usecases-nav-item", key === selected && 'is-active')}>{it}</a>)}
			</div>
		</div>
		<div className="usecases-items">
			{Object.entries(items).map(([title, content], key) => <UseCase key={key} isActive={selected === key} title={title}>{content}</UseCase>)}
		</div>
	</div>
};

export default function Home() {
	const context = useDocusaurusContext();
	const {siteConfig = {}} = context;
	return (
		<Layout
			title={`${siteConfig.title}`}
			description="Contember.com">
      <div className={'homepage'}>

        <div className="header"><a className="header-in" href="/">
          <h1 className="contember"><span className="logotyp view-alignShape">
              <svg className="shape shape-logotyp">
                {/*<use xlink:href="#shape-logotyp"></use>*/}
              </svg>
              <div className="logotyp-label">Contember</div></span>
          </h1>
        </a></div>
        <div className="siteLead">
          <div className="siteLead-in">
            <div className="siteLead-main">
              <h2 className="siteLead-title">Contember is an open source platform for building content applications.</h2>
              <div className="siteLead-text">
                <p>Start by defining the schema of your data and Contember will turn it onto a fast and friendly GraphQL API. Everything will be stored in a
                  neatly organized PostgreSQL database with just about the same reasonable structure as if crafted by hand.</p>
              </div>
              <div className="siteLead-actions"><a className="big-button" href="#corefeatures">Explore features</a></div>
              <div className="siteLead-actions"><a className="big-button big-button--alt" href="/docs/intro/how-it-works">Read documentation</a></div>
            </div>
          </div>
          <div className="siteLead-illustration"></div>
        </div>
        <div className="coreFeatureList" id="corefeatures">
          <div className="coreFeatureList-in">
            <h2 className="coreFeatureList-title">Core features</h2>
            <div className="coreFeatureList-items">
              <FeatureItem title={'Any data structure done right'}>
                Start by defining the schema of your data and Contember will turn it onto a fast and
                friendly <strong>GraphQL</strong> API. Everything will be stored in a neatly organized <strong>PostgreSQL</strong> database with just about the
                same reasonable structure as if crafted by hand.
              </FeatureItem>
              <FeatureItem title={'Fully Customizable Administration'}>Contember also ships with a large, extensible set of high-level composable <strong>React
                UI</strong> components
                that make it incredibly simple to build a completely custom administration designed with your application's exact needs in mind.
              </FeatureItem>
              <FeatureItem title={'ACL and Personalized Restricted APIs'}>
                Our <strong>powerful ACL</strong> gives you fine-grained control over permissions even at field level.
                Furthermore, your rules may also depend on the actual data, including related entities. With these rules, Contember can automatically generate a
                personalized, restricted GraphQL API for every access key you choose to issue.

              </FeatureItem>
              <FeatureItem title={'Multi-tenant and multi-language'}>Run any number of projects in one Contember instance, each with its own <strong>individual
                database
                structure</strong>. It also supports multi-lingual applications… by not imposing any limitations whatsoever on what or how you can store.
              </FeatureItem>
              <FeatureItem title={'Staging'}>Have you ever dreamed of having <strong>version control</strong> available while editing the content of a
                website? Contember can do this as well! Admittedly though, while the system is designed with this feature in its core, as of now it only
                supports two ‒ preview and production ‒ and can perform only basic merge operations.
              </FeatureItem>
              <FeatureItem title={'Auditable and Data-loss proof'}>Every data manipulation done via the API is automatically logged in an event stream
                and <strong>stored
                  permanently</strong>. This allows you to examine who and when changed anything, anywhere. It also enables seamless restoration of any previous
                state or reversion of any modification.
              </FeatureItem>
              <FeatureItem title={'Open Source'}>We're building Contember to improve the way websites and web applications are created and we'd love to <strong>share
                it</strong> with you. We'll therefore take Contember <strong>open-source on January 29, 2019 under the Apache v2 license</strong>.
              </FeatureItem>
              <FeatureItem title={'Auditable and Data-loss proof'}>Every data manipulation done via the API is automatically logged in an event stream
                and <strong>stored
                  permanently</strong>. This allows you to examine who and when changed anything, anywhere. It also enables seamless restoration of any previous
                state or reversion of any modification.
              </FeatureItem>
              <FeatureItem title={'Migrations'}>
                Have your <strong>requirements changed</strong>? Just update your data schema and tell Contember, and your APIs
                as well as their underlying databases will update as well.

              </FeatureItem>
              <FeatureItem title={'Technology'}>Contember API is written in TypeScript and Node.js. It creates GraphQL API for administration or any other
                application - like your website. It saves all your data to Postgres DB. Images and files are saved to object storage like Amazon S3. Contember
                UI is written in Typescript and React.
              </FeatureItem>

            </div>
          </div>
        </div>
        <div className="moreInfo">
          <div className="moreInfo-in">
            <h2 className="moreInfo-title">Wanna use it now? <br/>Get in touch!</h2>
            <div className="moreInfo-actions"><a className="big-button" href="#contact">Get detailed info</a></div>
          </div>
        </div>
        <UseCaseList items={{
          "CMS for Agencies": <>You get state-of-the-art headless CMS with custom administration, multi-language support, great block content
            editor and ability to define access level with a fine level of precision. You'll also get many more features out of the box - like stages, full
            event log, self-hosted and much more.<br/><br/>And if you're an agency, Contember supports multi-tenant usage, so you can have the admin panel
            deployed once and used across any number of projects.</>,
          "A content platform for multiple websites": <>If you're a marketing manager you know the pain of having multiple admin interfaces and many passwords,
            need of
            administration change with frontend website, the pain of data migration, inability to change the provider of frontend website and leave the
            administration as is.<br/><br/>Contember is here to the rescue. You get great administration tailored to your needs and can employ any number of
            agencies to create frontend websites, mobile applications or anything else.<br/><br/>Contember will provide custom-tailored GraphQL API for each
            of them and takes care of the security of your data. They'll just have to follow a simple set of rules while doing their work. Also, they can
            each run their application anywhere they want and read/save data to Contember API safely on your servers. And you have a log of each data
            change to always know exactly if something goes amiss.
          </>,
          "A custom application that manages data ": <>You can build lots of applications in a fraction of time just by configuring Contember.<br/><br/>Imagine an
            app
            for managing recipes for restaurants, printing them and distributing through API to a number of websites. It will take only days of configuration
            with Contember instead of months of custom development.<br/><br/>Or imagine a simple app for managing real estate offers and status of deals.
            Instead of months of development, you'll just configure Contember and you are mostly done. Yes, we imagine that in this case, you'll need to
            write 2 or 3 custom admin components in TypeScript. And if you would need more, thanks to design of DB structure, you can just write a
            micro-service to do specific tasks right in Postgres DB. And though it looks a bit tedious, it actually gives you unlimited power to do anything
            you desire. And Contember architecture is just fine with it.
          </>,
        }}/>
        <hr className="separator"/>
        <div className="why" id="why">
          <div className="why-in">
            <h2 className="why-title">Why Contember</h2>
            <p>We've been building websites for over 10 years. It is becoming clear that the current system is broken.</p>
            <p>As websites are being redesigned, data are saved in weird HTML chunks without any meaning, data migrations are getting just impossible without
              data loss, you’re redoing administration every time you're changing an agency. It’s wasteful and must stop.</p>
            <p>Headless CMS concept is here to the rescue. But it solves only part of the problem we see. There are many apps that are written from scratch even
              though they could and should be configured.</p>
            <p>After almost a year of development, we believe Contember will help you to develop certain apps in a fraction of time, separate frontend websites
              from content administration and make the web platform a bit more mature.</p>
          </div>
        </div>
        <div className="moreInfo" id="contact">
          <div className="moreInfo-in">
            <h2 className="form-title">Wanna use it now or know more? Get in touch!</h2>
            <form className='form view-small' name='subscribe' method='POST'>
              <input type='hidden' name='form-name' value='subscribe'/>
              <p>We will notify you when we have something new to share.</p>
              <label className="form-group">
                <input className="form-input" type="email" placeholder="Your email" name="email"/>
              </label>
              <input className="big-button form-button" type="submit" value="Subscribe"/>
            </form>
            <p className="form-sendEmail">Or send us an e-mail to <a href="mailto:sladek@mangoweb.cz">sladek@mangoweb.cz</a>.
            </p>
          </div>
        </div>
      </div>
		</Layout>)
	;
}
