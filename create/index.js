#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const fx = require('mkdir-recursive');

String.prototype.capitalize = function () {
    let result = '';
    this.split(' ').forEach( ( item ) => {
        result = `${result}${item.charAt(0).toUpperCase()}${item.substr(1)}`;
    } );
    return result;
};
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const argv = yargs
    .demand('sources')
    .alias('s', 'sources')
    .option('fields', {
        alias:      'f',
        describe:   'campos para gerar o banco de dados',
        type:       'string',
        conflicts:  ['verbose', 'debug'],
        default:    undefined
    })
    .argv;

const _data = argv.sources.split('/');
const _path = path.join( __dirname, `/../src/modules/${_data.join('/').toLowerCase()}` )
fx.mkdir( _path, ( err ) => create() );

function  create() {

    createFile = ( file, data ) => {
        fs.writeFileSync(
            file,
            data,
            ( error ) => {
                if ( error ) {
                    throw error;
                }
            }
        );

    }


    const files = [
        'create/route/template.route.txt',
        'create/controller/template.controller.txt',
        'create/graphql/template.graphql.txt',
        'create/graphql/template.resolve.txt',
        'create/graphql/template.query.txt',
        'create/service/template.service.txt',
        'create/repository/template.repository.txt',
        'create/filter/template.filter.txt',
        'create/entity/template.entity.txt',
    ];

    function getFields() {

        const _data = argv.sources.split('/');
        const nivel = '../'.repeat(_data.length);

        entityFields = '';
        graphqlFields = '';
        graphqlSearchs = '';
        graphql= '';
        graphqlFieldsUpdate = '';
        entityImports = '';
        graphqlImports = '';
        const typeNumber = [ 'int', 'number', 'float', 'bigint', 'real', 'double', 'decimal' ];
        const typeText = [ 'string', 'text', 'char', 'time' ];
        const typeDate =[ 'date', 'datetime' ];
        const types =[ 'boolean' ];
        argv.fields.split(',').forEach( ( data ) => {
            [ field, type, requeired ] = [...data.split(':') ];

            let realTypeEntity = type;
            let realTypeGraphql = type;
            if( typeNumber.indexOf(type.toLowerCase() ) > -1 ) {
                realTypeEntity = 'number';
                realTypeGraphql = 'int';
            }
            if( typeText.indexOf(type.toLowerCase() ) > -1 ) {
                realTypeEntity = 'string';
                realTypeGraphql = 'string';
            }
            if( typeDate.indexOf(type.toLowerCase() ) > -1 ) {
                realTypeEntity = 'date';
                realTypeGraphql = 'date';
            }

            if(
                typeNumber.indexOf(type.toLowerCase() ) === -1 &&
                typeText.indexOf(type.toLowerCase() ) === -1 &&
                typeDate.indexOf(type.toLowerCase() ) === -1 &&
                types.indexOf(type.toLowerCase() ) === -1
            ) {
                entityRequered = `@AllowNull( ${!!!requeired} )`;
                entityType = `@ForeignKey( () => ${type.capitalize()}Entity.default )
    @PrimaryKey
    @Column( DataType.BIGINT )`;
                entityField = `${type.toLowerCase()}_id: number;`;
                entityImports += `import * as ${type.capitalize()}Entity from './../${nivel}${type.toLowerCase()}/entity/${type.toLowerCase()}.entity';
`
            } else {
                entityRequered = `@AllowNull( ${!!!requeired} )`;
                entityType = `@Column( DataType.${type.toUpperCase()} )`;
                entityField = `${field}: ${realTypeEntity};`;
            }

            entityFields += `
    ${entityRequered}
    ${entityType}
    ${entityField}
            `;

            graphqlRequered = !!requeired ? '!' : '';
            if ( typeNumber.indexOf(type.toLowerCase() ) > -1 ||
                typeText.indexOf(type.toLowerCase() ) > -1 ||
                typeDate.indexOf(type.toLowerCase() ) > -1 ||
                types.indexOf(type.toLowerCase() ) > -1
            ) {
                graphqlType = realTypeGraphql.capitalize();
                graphqlField = field;

                _graphqlType = realTypeGraphql.capitalize();
                _graphqlField = field;
            }else{
                graphqlType = `Int`;
                graphqlField = `${field}_id`;

                _graphqlType = type.toLowerCase();
                _graphqlField = field;

                graphqlImports += `import { ${type.capitalize()}Service } from './../${nivel}${type.toLowerCase()}/service/${type.toLowerCase()}.service';
`
            }

            graphql += `
                ${_graphqlField}: ${_graphqlType}${graphqlRequered}`;

            graphqlFieldsUpdate += `
                ${_graphqlField}_id: Int`;

            graphqlFields += `
                ${graphqlField}: ${graphqlType}${graphqlRequered}`;


            graphqlSearchs += `
                ${graphqlField}: ${graphqlType}
                ${graphqlField}_eq: ${graphqlType}
                ${graphqlField}_not: ${graphqlType}
                ${graphqlField}_in: [${graphqlType}!]
                ${graphqlField}_not_in: [${graphqlType}!]
                ${graphqlField}_lt: ${graphqlType}
                ${graphqlField}_lte: ${graphqlType}
                ${graphqlField}_gt: ${graphqlType}
                ${graphqlField}_gte: ${graphqlType}
                ${graphqlField}_contains: ${graphqlType}
                ${graphqlField}_not_contains: ${graphqlType}
                ${graphqlField}_starts_with: ${graphqlType}
                ${graphqlField}_not_starts_with: ${graphqlType}
                ${graphqlField}_ends_with: ${graphqlType}
                ${graphqlField}_not_ends_with: ${graphqlType}
            `
        });
        return { entityFields, graphqlFields, graphqlSearchs, graphql, graphqlFieldsUpdate, entityImports, graphqlImports };
    }


    files.forEach( async ( file ) => {
        const file_name = file.split('.').slice(-2).slice(0, -1)[0];
        const dirname = file.split('/').slice(-2)[0];

        const _filename = file.split('/');
        console.log( `Arquivo: ${_filename[_filename.length-2].capitalize()}, criado com sucesso!` );
        await fs.readFile(
            file,
            'utf8',
            async ( err, data ) => {
                if ( err ) throw err;
                const _fields = getFields();
                const _data = argv.sources.split('/');
                const _path = path.join( __dirname, `/../src/modules/${_data.join('/').toLowerCase()}/${dirname}` )
                const filename = _data.pop();
                const name = filename.replaceAll(' ', '');
                const upname = filename.capitalize();
                const lowername = filename.toLowerCase();
                const fullpath = path.join( _path,`/${lowername}.${file_name}.ts`);
                const endpoint = argv.endpoint || name;
                const nivel = '../'.repeat(_data.length);
                const newData = data.replaceAll( '<%= name %>', name )
                                    .replaceAll( '<%= upname %>', upname )
                                    .replaceAll( '<%= lowername %>', lowername )

                                    .replaceAll( '<%= entityFields %>', _fields.entityFields )
                                    .replaceAll( '<%= entityImports %>', _fields.entityImports )

                                    .replaceAll( '<%= graphqlFields %>', _fields.graphqlFields )
                                    .replaceAll( '<%= graphqlSearchs %>', _fields.graphqlSearchs )
                                    .replaceAll( '<%= graphqlFieldsUpdate %>', _fields.graphqlFieldsUpdate )
                                    .replaceAll( '<%= graphqlImports %>', _fields.graphqlImports )
                                    .replaceAll( '<%= graphql %>', _fields.graphql )

                                    .replaceAll( '<%= endpoint %>', endpoint )
                                    .replaceAll('<%= nivel %>', nivel);
                return await createFolder( _path, fullpath, newData );
            }
        );
    });

    const createFolder = async ( folder, fullpath, newData ) => {
        return await fx.mkdir(folder, async ( err ) => await createFile( fullpath, newData ) );
    }

    return console.log( '\n\nEndpoint criado com sucesso!');
}
