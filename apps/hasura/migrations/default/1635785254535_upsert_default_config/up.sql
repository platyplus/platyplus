INSERT INTO platyplus.pages ("title", "icon", "contents", "slug", "id")
VALUES(
        'Home',
        'home',
        '[{ "type": "paragraph", "children": [{ "text": "Home page" }] }]'::jsonb,
        'home',
        '28331288-8c7a-4b6d-ada8-bfadd59b3382'
    ) ON CONFLICT ON CONSTRAINT pages_pkey DO
UPDATE
SET "title" = 'Home',
    "icon" = 'home',
    "contents" = '[{ "type": "paragraph", "children": [{ "text": "Home page" }] }]'::jsonb,
    "slug" = 'home';
INSERT INTO platyplus.app_config ("menu", "home")
VALUES(default, default);