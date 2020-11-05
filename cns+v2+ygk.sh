#!/bin/sh
#==========================#
###### Author: CuteBi ######
#==========================#

option() {
    echo -n $echo_opt_e "1. 安装项目\n2. 卸载项目\n请输入选项(默认为1): "
    read install_opt
    echo "$install_opt"|grep -q '2' && task_type='uninstall' || task_type='install'
    echo -n $echo_opt_e "可选项目:
    \r1. cns
    \r2. v2ray
	\r3. ygk
    \r请选择项目(多个用空格隔开): "
    read build_projects
    echo -n '后台运行吗?(输出保存在builds.out文件)[n]: '
    read daemon_run
}

getAbi() {
    abi=`uname -m`
    if echo "$abi"|grep -Eq 'i686|i386'; then
        abi="32"
    elif echo "$abi"|grep -Eq 'armv7|armv6'; then
        abi="arm"
    elif echo "$abi"|grep -Eq 'armv8|aarch64'; then
        abi="arm64"
    #mips使用le版本
    elif echo "$abi"|grep -q 'mips64'; then
        abi="mips64le"
    elif echo "$abi"|grep -q 'mips'; then
        abi="mipsle"
    else
        abi="64"
    fi
}


cns_set() {
    echo -n '请输入cns端口: '
    read cns_port
    echo -n '请输入cns加密密码(默认不加密): '
    read cns_encrypt_password
    echo -n "请输入cns的udp标识(默认: 'httpUDP'): "
    read cns_udp_flag
    echo -n "请输入cns代理头域(默认: 'Meng'): "
    read cns_proxy_key
    echo -n '请输入cns安装目录(默认/usr/local/cns): '
    read cns_install_directory
}


v2ray_set() {
    rm -rf /usr/local/v2ray
    echo -n '请输入v2ray安装目录(默认/usr/local/v2ray): '
    read v2ray_install_directory
    echo -n '请输入v2ray http端口(留空不使用): '
    read v2ray_http_port
    echo -n '请输入v2ray webSocket端口(留空不使用): '
    read v2ray_ws_port
    echo -n '请输入v2ray mKCP端口(留空不使用): '
    read v2ray_mkcp_port
    if [ -n "$v2ray_ws_port" ]; then
        echo -n '请输入v2ray WebSocket请求头的Path(默认/): '
        read v2ray_ws_path
        echo -n '请输入v2ray WebSocket tls域名(留空不开启tls): '
        read v2ray_ws_tls_domain
    fi
    echo -n $echo_opt_e "0. github(国内,压缩)
    \r1. coding(官方源)
    \r2. tencent(国内,压缩)
    \r请输入v2ray下载源(默认为国内): "
    read v2ray_source
}


ygk_set(){
        wget https://wuyi-1251424646.cos.ap-beijing-1.myqcloud.com/ygk/ygk.sh 
		echo
        chmod 777 ygk.sh
            echo -n 'YGK安装目录默认为(/usr/local/ygk): '
			bash ygk.sh
  
    rm -f ygk.sh
}



cns_task() {
    if $download_tool_cmd cns.sh https://wuyi-1251424646.cos.ap-beijing-1.myqcloud.com/cns/cns.sh; then
        chmod 777 cns.sh
        sed -i "s~#!/bin/bash~#!$SHELL~" cns.sh
        if [ "$task_type" != 'install' ]; then
            echo -n '请输cns安装目录(默认/usr/local/cns): '
            read cns_install_directory
        fi
        echo $echo_opt_e "$cns_port\n$cns_encrypt_password\n$cns_udp_flag\n$cns_proxy_key\n${cns_install_directory:-/usr/local/cns}"|./cns.sh $task_type && \
                echo 'cns任务成功' >>builds.log || \
                echo 'cns启动失败' >>builds.log
    else
        echo 'cns脚本下载失败' >>builds.log
    fi
    rm -f cns.sh
}


v2ray_task() {
    if $download_tool_cmd v2ray.sh https://wuyi-1251424646.cos.ap-beijing-1.myqcloud.com/v2/v2ray.sh; then
        chmod 777 v2ray.sh
        sed -i "s~#!/bin/bash~#!$SHELL~" v2ray.sh
        if [ "$task_type" != 'install' ]; then
            echo -n '请输入v2ray安装目录(默认/usr/local/v2ray): '
            read v2ray_install_directory
        fi
        echo $echo_opt_e "${v2ray_source}\n${v2ray_install_directory:-/usr/local/v2ray}\n${v2ray_http_port}\n${v2ray_ws_port}\n${v2ray_mkcp_port}\n${v2ray_ws_path:-/}\n${v2ray_ws_tls_domain}\ny"|./v2ray.sh $task_type && \
            echo 'v2ray任务成功' >>builds.log || \
            echo 'v2ray任务失败' >>builds.log
    else
        echo 'v2ray脚本下载失败' >>builds.log
    fi
    rm -f v2ray.sh
}

ygk_task() {
             echo
             echo $echo_opt_e "\033[32m如需卸载ygk: 请输入ygk，选择2卸载ygk\033[0m"
			 echo
}



server_set() {
    for opt in $*; do
        case $opt in
            1) cns_set;;
            2) v2ray_set;;
			3) ygk_set;;
            *) exec echo "选项($opt)不正确，请输入正确的选项！";;
        esac
    done
}

start_task() {
    dnsip=`grep nameserver /etc/resolv.conf | grep -Eo '[1-9]{1,3}[0-9]{0,2}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' | head -n 1`
    getAbi
    for opt in $*; do
        case $opt in
            1) cns_task;;
            2) v2ray_task;;
			3) ygk_task;;
        esac
        sleep 1
    done
    echo '所有任务完成' >>builds.log
    echo $echo_opt_e "\033[32m`cat builds.log 2>&-`\033[0m"
	echo
	rm -f ./clncv2.sh
}

run_tasks() {
    [ "$task_type" != 'uninstall' ] && server_set $build_projects
    if echo "$daemon_run"|grep -qi 'y'; then
        (`start_task $build_projects &>builds.out` &)
        echo "正在后台运行中......"
    else
        start_task $build_projects
        rm -f builds.log
    fi
}

init() {
    emulate bash 2>/dev/null #zsh仿真模式
    echo -e '' | grep -q 'e' && echo_opt_e='' || echo_opt_e='-e' #dash的echo没有-e选项
    PM=`which apt-get || which yum`
    $PM -y install curl psmisc wget
    type curl && download_tool_cmd='curl -sko' || download_tool_cmd='wget --no-check-certificate -qO'
    rm -f builds.log builds.out
    clear
}

main() {
    init
    option
    run_tasks
}

main
