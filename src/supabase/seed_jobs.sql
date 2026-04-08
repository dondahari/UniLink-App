-- seed_jobs.sql
-- Run this script in your Supabase SQL Editor to insert mock jobs across different fields!
-- IMPORTANT: Make sure you ran 0003_add_job_details.sql and 0004_add_job_descriptions.sql first!

-- 1. Insert 5 Dummy Categories (Industries)
INSERT INTO public.category (cat_id, cat_name, cat_desc, dept_code)
VALUES 
    ('c0000000-0000-0000-0000-000000000001', 'Technology', 'Software, IT, and Data', 'TECH'),
    ('c0000000-0000-0000-0000-000000000002', 'Finance', 'Accounting, Banking, and Investments', 'FIN'),
    ('c0000000-0000-0000-0000-000000000003', 'Healthcare', 'Medical, Nursing, and Biotech', 'HLTH'),
    ('c0000000-0000-0000-0000-000000000004', 'Marketing', 'Digital Marketing, PR, and Sales', 'MKTG'),
    ('c0000000-0000-0000-0000-000000000005', 'Engineering', 'Civil, Mechanical, and Electrical', 'ENGR'),
    ('c0000000-0000-0000-0000-000000000006', 'Design', 'UI/UX, Graphic Design, and Multimedia', 'DSGN')
ON CONFLICT (cat_id) DO NOTHING;

-- 2. Insert 11 Dummy Employers
INSERT INTO public.employer (employer_id, co_name, industry, location, website)
VALUES 
    ('e0000000-0000-0000-0000-000000000001', 'NextGen Labs', 'Technology', 'Boca Raton, FL', 'https://nextgenlabs.co'),
    ('e0000000-0000-0000-0000-000000000002', 'Capital Partners', 'Finance', 'Boca Raton, FL', 'https://capitalpartners.test'),
    ('e0000000-0000-0000-0000-000000000003', 'CareFirst Health', 'Healthcare', 'Boca Raton, FL', 'https://carefirst.test'),
    ('e0000000-0000-0000-0000-000000000004', 'Creative Pulse', 'Marketing', 'Boca Raton, FL', 'https://creativepulse.test'),
    ('e0000000-0000-0000-0000-000000000005', 'BuildCore Inc.', 'Engineering', 'Boca Raton, FL', 'https://buildcore.test'),
    ('e0000000-0000-0000-0000-000000000006', 'Boca Slice Pizzeria', 'Food & Beverage', 'Boca Raton, FL', 'https://bocaslice.test'),
    ('e0000000-0000-0000-0000-000000000007', 'Pedal Pushers Bike Shop', 'Retail', 'Boca Raton, FL', 'https://pedalpushersboca.test'),
    ('e0000000-0000-0000-0000-000000000008', 'Bubble Bliss Boba', 'Food & Beverage', 'Boca Raton, FL', 'https://bubblebliss.test'),
    ('e0000000-0000-0000-0000-000000000009', 'Ace Tennis Hub', 'Retail/Sports', 'Boca Raton, FL', 'https://acetennishub.test'),
    -- Remote Companies
    ('e0000000-0000-0000-0000-000000000010', 'CloudScale Solutions', 'Technology', 'Remote', 'https://cloudscale.test'),
    ('e0000000-0000-0000-0000-000000000011', 'Global Remote Group', 'Marketing', 'Remote', 'https://globalremote.test')
ON CONFLICT (employer_id) DO UPDATE SET location = EXCLUDED.location;

-- 3. Insert 29 Dummy Job Postings (Includes descriptions)
INSERT INTO public.job_posting (job_id, employer_id, cat_id, job_title, rate, exp_lvl, contract_time, pay_type, job_desc)
VALUES 
    -- Technology (NextGen Labs) -- Hourly Contracts
    ('d0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Front-End Engineer', 45.00, 'Entry-level', '6 Months', 'Hourly', 'Join our dynamic tech team to build responsive and robust web applications. You will be working directly with our Senior Engineers to ship components using React and Tailwind CSS.'),
    ('d0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Data Analyst Intern', 25.00, 'Internship', '3 Months', 'Hourly', 'Assist our analytics division in cleaning and interpreting large datasets. This is a hands-on learning role perfect for students proficient in Python and SQL.'),
    ('d0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Junior Product Designer', 35.00, 'Entry-level', '12 Months', 'Hourly', 'Help conceptualize and design new user interfaces for our flagship SaaS product. You will shadow our lead UX researchers and maintain our Figma design system.'),
    ('d0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Junior DevOps Engineer', 40.00, 'Entry-level', 'Permanent', 'Hourly', 'Maintain and optimize our cloud infrastructure deployments on AWS. Your primary responsibilities include managing scaling clusters and optimizing CI/CD pipelines.'),
    
    -- Finance (Capital Partners) -- Hourly Contracts
    ('d0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'Investment Analyst', 50.00, 'Entry-level', '6 Months', 'Hourly', 'Conduct comprehensive financial modeling and market research reports. You will assist portfolio managers in finding undervalued market assets.'),
    ('d0000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'Audit Associate', 35.00, 'Entry-level', '12 Months', 'Hourly', 'Perform financial audits and ensure SEC compliance across multiple client portfolios. Great stepping stone for achieving your CPA.'),
    ('d0000000-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'Finance Summer Intern', 28.00, 'Internship', '3 Months', 'Hourly', 'Join our fast-paced rotating summer program, exploring wealth management and corporate finance. A great entry point to secure a permanent return offer.'),
    ('d0000000-0000-0000-0000-000000000008', 'e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'Risk Management Analyst', 35.00, 'Entry-level', 'Permanent', 'Hourly', 'Analyze internal and external liabilities to protect firm assets. Heavy data entry and forecasting using advanced Excel and Bloomberg Terminal.'),
    
    -- Healthcare (CareFirst Health) -- Hourly Contracts
    ('d0000000-0000-0000-0000-000000000009', 'e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 'Nursing Assistant', 22.00, 'Entry-level', '6 Months', 'Hourly', 'Provide direct patient care and assist registered nurses in daily ward duties. Excellent hands-on experience for pre-med or nursing students.'),
    ('d0000000-0000-0000-0000-000000000010', 'e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 'Clinical Research Intern', 20.00, 'Internship', '12 Months', 'Hourly', 'Help coordinate ongoing clinical trials by managing patient outreach and data collection logs. Strong attention to regulatory compliance is required.'),
    ('d0000000-0000-0000-0000-000000000011', 'e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 'Healthcare Tech Intern', 20.00, 'Internship', '4 Months', 'Hourly', 'Support our IT team in transitioning offline patient records to our new secure cloud database. Requires familiarity with HIPAA security standards.'),
    ('d0000000-0000-0000-0000-000000000012', 'e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 'Healthcare Admin Assistant', 25.00, 'Entry-level', 'Permanent', 'Hourly', 'Manage outpatient scheduling, verify insurance claims, and streamline our front-desk operations. Strong organizational skills are mandatory.'),

    -- Marketing (Creative Pulse) -- Hourly Contracts
    ('d0000000-0000-0000-0000-000000000013', 'e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000004', 'Digital Marketing Specialist', 30.00, 'Entry-level', '6 Months', 'Hourly', 'Run multi-platform social media ad campaigns using Google and Meta Ads manager. Track conversion rates and optimize ad spend across client portfolios.'),
    ('d0000000-0000-0000-0000-000000000014', 'e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000004', 'Junior SEO Strategist', 25.00, 'Entry-level', 'Permanent', 'Hourly', 'Audit client websites and discover high-value keywords to drive organic search traffic. You will write briefs for our content team based on your strategy.'),
    ('d0000000-0000-0000-0000-000000000015', 'e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000004', 'Copywriting Intern', 18.00, 'Internship', '3 Months', 'Hourly', 'Draft engaging copy for newsletters, product descriptions, and landing pages. Ideal for creative writing or journalism majors looking to build a portfolio.'),
    ('d0000000-0000-0000-0000-000000000016', 'e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000004', 'Graphic Design Intern', 18.00, 'Internship', 'Permanent', 'Hourly', 'Design banners, infographics, and ad creatives using Adobe Creative Suite. You will collaborate daily with our senior art director.'),

    -- Engineering (BuildCore Inc.) -- Hourly Contracts
    ('d0000000-0000-0000-0000-000000000017', 'e0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000005', 'Civil Engineer Junior', 38.00, 'Entry-level', '12 Months', 'Hourly', 'Assist in structural analysis and drafting for commercial real estate developments. Occasional on-site surveying in the South Florida area required.'),
    ('d0000000-0000-0000-0000-000000000018', 'e0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000005', 'Junior CAD Drafter', 26.00, 'Entry-level', '6 Months', 'Hourly', 'Create precise 2D and 3D architectural blueprints using AutoCAD and Revit. Attention to structural detail is extremely critical.'),
    ('d0000000-0000-0000-0000-000000000019', 'e0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000005', 'Sustainability Intern', 22.00, 'Internship', '3 Months', 'Hourly', 'Research eco-friendly building materials and assist in calculating LEED certification feasibility for upcoming development projects.'),
    ('d0000000-0000-0000-0000-000000000020', 'e0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000005', 'Assistant Project Engineer', 35.00, 'Entry-level', 'Permanent', 'Hourly', 'Act as the liaison between contractors and our lead engineers. You will track supply chain logistics and monitor daily construction reports.'),

    -- Local Business Bounties (Gig Work) -- Flat Target Bounties
    ('d0000000-0000-0000-0000-000000000021', 'e0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000004', 'Manage Instagram & TikTok', 850.00, 'Bounty / Gig', 'Flexible', 'Bounty', 'We are looking for a creative student to run our pizzeria’s social media for a month. We need 3 TikToks a week showcasing our pizza making, and consistent Instagram story updates.'),
    ('d0000000-0000-0000-0000-000000000022', 'e0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000001', 'Update Shopify eCommerce Website', 1200.00, 'Bounty / Gig', 'Flexible', 'Bounty', 'Our local bike shop needs a complete Shopify theme overhaul. You will be migrating 50 products to the new layout and ensuring the checkout system functions flawlessly.'),
    ('d0000000-0000-0000-0000-000000000023', 'e0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000004', 'Redesign Shop Logo & Menus', 500.00, 'Bounty / Gig', 'Flexible', 'Bounty', 'We are expanding our boba flavors and need our digital/physical menus completely redesigned, alongside a modernized vector graphic of our main logo.'),
    ('d0000000-0000-0000-0000-000000000024', 'e0000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000004', 'Social Media Event Promoter', 250.00, 'Bounty / Gig', 'Flexible', 'Bounty', 'We are hosting a weekend tennis tournament and need a local promoter to distribute digital flyers and generate buzz in local Facebook community groups to hit our registration quota.'),
    ('d0000000-0000-0000-0000-000000000025', 'e0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000001', 'Build Local Delivery App MVP', 2400.00, 'Bounty / Gig', 'Flexible', 'Bounty', 'We are attempting to bypass UberEats. We need a CS student to build a basic React Native delivery app where customers can place pizza orders directly to our PoS system.'),

    -- Remote Full-Time Roles -- Yearly Compensation
    ('d0000000-0000-0000-0000-000000000026', 'e0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000001', 'Junior Remote Developer', 75000.00, 'Entry-level', 'Permanent', 'Yearly', 'Work from anywhere in the US alongside our distributed engineering team. Write unit tests, debug legacy enterprise software, and participate in daily remote standups.'),
    ('d0000000-0000-0000-0000-000000000027', 'e0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000001', 'Cloud Operations Intern', 55000.00, 'Internship', 'Permanent', 'Yearly', 'An incredible remote internship learning the ropes of enterprise cloud scaling. You will assist our senior architects in managing load balancers and writing Terraform scripts.'),
    ('d0000000-0000-0000-0000-000000000028', 'e0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000004', 'Growth Marketing Analyst', 65000.00, 'Entry-level', 'Permanent', 'Yearly', 'Analyze user acquisition metrics on a massive global scale. We need sharp analytical minds to A/B test marketing funnels and drive millions of new impressions.'),
    ('d0000000-0000-0000-0000-000000000029', 'e0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000004', 'Content Associate', 60000.00, 'Entry-level', 'Permanent', 'Yearly', 'Produce high volume, engaging text content for our remote media conglomerate. You will research SEO trends and write 4-5 long-form articles weekly.')
ON CONFLICT (job_id) DO UPDATE SET 
    job_title = EXCLUDED.job_title,
    exp_lvl = EXCLUDED.exp_lvl,
    contract_time = EXCLUDED.contract_time, 
    pay_type = EXCLUDED.pay_type,
    rate = EXCLUDED.rate,
    job_desc = EXCLUDED.job_desc;

-- 4. Fix RLS Visibility (Crucial for Dashboard fetching!)
-- By default, Supabase RLS hid employers and job postings from students. 
-- We gracefully add SELECT policies so any authenticated user can view them.
DROP POLICY IF EXISTS "Public can view job postings" ON public.job_posting;
CREATE POLICY "Public can view job postings"
    ON public.job_posting FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Public can view employers" ON public.employer;
CREATE POLICY "Public can view employers"
    ON public.employer FOR SELECT
    USING (true);
