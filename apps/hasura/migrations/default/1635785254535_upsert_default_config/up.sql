INSERT INTO platyplus.pages ("title", "icon", "contents", "slug", "id")
VALUES(
        'Home',
        'home',
        'Home page',
        'home',
        '28331288-8c7a-4b6d-ada8-bfadd59b3382'
    ) ON CONFLICT ON CONSTRAINT pages_pkey DO
UPDATE
SET "id" = '28331288-8c7a-4b6d-ada8-bfadd59b3382',
    "title" = 'Home',
    "icon" = 'home',
    "contents" = '[{ "type": "paragraph", "children": [{ "text": "" }] }]',
    "slug" = 'home';
INSERT INTO platyplus.app_config ("menu", "home")
VALUES(default, default);